import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { User} from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {genSaltSync, hashSync} from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwt: JwtService,
    ) {}

    public async findAll(): Promise<User[]> {

        return  await this.userRepository.find();
    }

    public async FindOne(id: number): Promise<User> {

        return await this.userRepository.findOne({ id }, {relations : ['publications']});
    }

    public async Save(user: User): Promise<User> {

        user.password = this.EncryptPassword(user.password);
        return await this.userRepository.save(user);
    }

    public async UpdateUser(id: number, newUser: User): Promise<User> {

        const user = await this.userRepository.findOne(id);

        if (newUser.password) {
            newUser.password = this.EncryptPassword(newUser.password);
        }

        const updatedUser = Object.assign(user, newUser);

        return await this.userRepository.save(updatedUser);
    }

    public async DeleteUser(id: number): Promise<boolean> {

        const affected =  (await this.userRepository.delete(id)).affected;

        return affected > 0;
    }

    public async CreateToken(user: User): Promise<string| void> {

        const result = await this.userRepository.findOne(user.id);

        if (result) {
            return this.jwt.sign(JSON.stringify(result));
        } else {
            return null;
        }

    }

    public async VerifyToken(token: string): Promise<boolean> {

        try {
            const user  = this.jwt.verify<User>(token);

            if (user) {

              const checkUser = await this.userRepository.findOne({password : user.password , id : user.id});

              if (checkUser) {

                return true;

              }

            }

        } catch (error) {
            return false;
        }

        return false;

    }

    public async CleanDatabase() {
        (await this.userRepository.find()).forEach( async user => {

            await this.userRepository.delete(user);
        });
    }

    private EncryptPassword(pass: string) {
        if (pass) {
            return hashSync(pass);
        }
        return pass;
    }
}
