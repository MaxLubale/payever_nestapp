import { Controller, Post, Get, Delete, Param, Res, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';


@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: any) {
    await this.usersService.createUser(userData);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.usersService.getUser(userId);
  }

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const avatarData = await this.usersService.getAvatar(userId);
      res.set('Content-Type', 'image/png');
      res.send(Buffer.from(avatarData, 'base64'));
    } catch (error) {
      console.error('Error getting avatar:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Delete(':userId/avatar')
  async deleteAvatar(@Param('userId') userId: string) {
    return this.usersService.deleteAvatar(userId);
  }
}
