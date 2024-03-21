import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { ClientProxy } from '@nestjs/microservices';
import { EmailService } from '../email/email.service';
import { User } from './users.model'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
    private readonly emailService: EmailService,
  ) {}

  async createUser(userData: Partial<User>) {
    try {
      const createdUser = await this.userModel.create(userData);
      console.log('New user created:', createdUser);
      this.client.emit('user_created', createdUser);
      await this.emailService.sendEmail(
        'lubalecliff@gmail.com',
        'New User Created',
        'A new user has been created.',
      );

      return { message: 'User created successfully', user: createdUser };
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async getUser(userId: string) {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.data;
  }

  async getAvatar(userId: string) {
    const user = await this.userModel.findOne({ userId });

    if (!user || !user.avatar) {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const avatarUrl = response.data.data.avatar;
      const avatarData = await this.downloadImage(avatarUrl);
      await this.userModel.updateOne({ userId }, { $set: { avatar: avatarData } });
      return avatarData;
    } else {
      return user.avatar;
    }
  }

  private async downloadImage(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64Data = Buffer.from(response.data).toString('base64');
    return base64Data;
  }


  async deleteAvatar(userId: string) {
    const user = await this.userModel.findOne({ userId });
    
    if (user && user.avatar) {
        // Delete the avatar file
        fs.unlinkSync(path.join(__dirname, 'avatars', `${userId}.png`));
        
        // Unset the avatar field in the user document
        await this.userModel.updateOne({ userId }, { $unset: { avatar: 1 } });
    }
}
}
