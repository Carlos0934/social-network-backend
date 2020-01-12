import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [DatabaseModule, UserModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
