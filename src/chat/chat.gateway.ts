import { SubscribeMessage, WebSocketGateway , WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService, ChatMessage, Chat } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {

  constructor(
    private chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { chatID: string, message: ChatMessage } ): void {

    this.chatService.AddMessage(payload.message , payload.chatID );
    client.in(payload.chatID).emit('message', this.chatService.chats[payload.chatID] );

  }

  async handleConnection(client: Socket , ...args: any[] ) {
    const token =  client.handshake.headers['Token'];
    if (!await this.chatService.VerifyChatToken(token)) {
      client.disconnect(true);

    } else {
      const chatID = await this.chatService.JoinToChat(token);
      client.join(chatID).send('ConnectionAccepted' , {chatID});

    }
  }
}
