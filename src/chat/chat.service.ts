import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { hashSync } from 'bcryptjs';

export interface ChatMessage {
    message: string;
    userId: number;
}
export interface Chat {
    users: number[];
    messages: ChatMessage[];
}

interface Dictionary<T = any> {
    [id: string]: T;
}

interface VerifyToken {
    users: User[];
    id: string;
}

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwt: JwtService,
    ) {}

    public chats: Dictionary<Chat> = {};

    public AddMessage(message: ChatMessage, chatID: string) {
        this.chats[chatID].messages.push(message);
    }

    public CreateChatToken(users: User[], chatID: string) {
        const token = this.jwt.sign({ users, id : chatID });
        return token;
    }

    public async VerifyChatToken(token: string) {
        const data: VerifyToken =  this.jwt.verify(token);
        if (data && data.users ) {

            if  (!data.id || !Object.keys(this.chats).includes(data.id) ) {
                return false;

            }

            const checks = await Promise.all(data.users.map(async user => {
                const checkUser =  await this.userRepository.findOne({ id: user.id , password: user.password });
                if (checkUser) {
                    return true;
                }
                return false;
            }));

            if (checks.includes(false) ) {
                return false;
            }

            return true;
        }
    }

    public async CreateChat(users: User[], id: string) {
        const chatID = hashSync(id);
        const token = this.CreateChatToken(users, chatID);

        this.chats[chatID] = {
            messages : [],
            users : users.map(user => user.id),
        };
        return token;
    }

    public async JoinToChat(token: string) {

        if (await this.VerifyChatToken(token)) {
            const chatID = this.jwt.verify<VerifyToken>(token).id;
            return chatID;
        }

    }

}
