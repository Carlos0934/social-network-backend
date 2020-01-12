import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards, Res, HttpStatus, Req, HttpCode } from '@nestjs/common';

import {UserService} from './user.service';
import { User } from 'src/database/entities/user.entity';
import { Response } from 'express';

import { TokenGuard } from './token.guard';

@Controller('api/users')
export class UserController {

    constructor(
        private service: UserService,
    ) {}

    @UseGuards(TokenGuard)
    @Get()
    public GetAllUsers() {
        return this.service.findAll();
    }

    @UseGuards(TokenGuard)
    @Get(':id')
    public GetOneUser(@Param('id') id: number) {

        return this.service.FindOne(id);
    }

    @Post()
    public async SaveUser(@Body() user: User,  @Res() response: Response) {

        const savedUser = await this.service.Save(user);
        const token = await this.service.CreateToken(savedUser);

        if (token) {

            response.setHeader('Bearer', token);

            return response.json(savedUser);
        }
        return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({Failed: ''});

    }

    @UseGuards(TokenGuard)
    @Put(':id')
    public async UpdateUser(@Param('id') id: number , @Body() user: User, @Res() response: Response ) {

        const  updatedUser = await this.service.UpdateUser(id , user);

        const token = await this.service.CreateToken(updatedUser);
        if (token) {

            response.setHeader('Bearer', token);

            return response.json(updatedUser);
        }
        return ;
    }

    @UseGuards(TokenGuard)
    @Delete(':id')
    public async DeleteUser(@Param('id') id: number) {
        if (await this.service.DeleteUser(id)) {
            return {
                message: 'Deleted Succesfully',
            };
        }
        return {
            message: 'User Not Found',
        };

    }

    @Post('create')
    public async GetToken(@Body() user: User, @Res() response: Response) {

       const token = await this.service.CreateToken(user);
       if (token) {
            response.setHeader('Bearer', token);

            return response.status(HttpStatus.OK).json({
                message: 'Token created Succesfully',
            });
       } else {

           return response.status(HttpStatus.NOT_ACCEPTABLE).json({
               message : 'Invalid Body',
           });
       }
    }

    @UseGuards(TokenGuard)
    @Delete('')
    public async DeleteAll() {
        await this.service.CleanDatabase();
        return {
            message : 'Success All Deleted',
        };
    }
}
