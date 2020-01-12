import { Module } from '@nestjs/common';
import {UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {privateKey} from '../../.env.json';
import {PublicationController} from './publication.controller';
import {PublicationService} from './publication.service';
import { Publication } from 'src/database/entities/publications.entity';

@Module({
  imports :  [TypeOrmModule.forFeature([User, Publication]) , JwtModule.register({ secret: privateKey })],
  controllers : [UserController, PublicationController],
  providers: [UserService, PublicationService],
})
export class UserModule {}
