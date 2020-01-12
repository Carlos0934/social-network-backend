import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import {databaseConfig} from '../../.env.json';

@Module({
    imports : [ TypeOrmModule.forRoot({
        type : 'mysql',
        port : 3306,
        host : databaseConfig.host,
        database : databaseConfig.database,
        password : databaseConfig.password,
        username : databaseConfig.usernmae,
        entities : ['dist/**/*.entity{.ts,.js}'],

    })],
})
export class DatabaseModule {}
