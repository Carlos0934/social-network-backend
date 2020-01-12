import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {privateKey} from '../../.env.json';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret : privateKey })],
  controllers: [ChatController],
})
export class ChatModule {}
