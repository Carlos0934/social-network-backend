import { Controller, Body, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { User } from 'src/database/entities/user.entity';

@Controller('chat')
export class ChatController {

    constructor(
      private chatService: ChatService,
    ) {}

    @Post(':id')
    public async CreateToken(@Body() users: User[], @Param('id') id: string ) {
        return await this.chatService.CreateChatToken(users , id);
    }

    @Post('create/:id')
    public async CreateChatRoom(@Body() users: User[], @Param('id') id) {
        return await this.chatService.CreateChat(users, id);
    }
}
