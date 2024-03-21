import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users/users.controller';
import { EmailService } from './email/email.service';
import { UsersService } from './users/users.service';
import { UserModel } from './users/users.model'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs_db'),
    MongooseModule.forFeature([{ name: 'User', schema: UserModel.schema }]), 
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'nestjs_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class AppModule {}
