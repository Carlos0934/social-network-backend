import { Column , Entity , PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { server } from '../../../.env.json';
import { Publication } from './publications.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({
        name: 'pass',
    })
    password: string;

    @Column()
    gender: string;

    @Column({
        name : 'image_path',
        default : server + '/api/images/undifined',
    })
    imagePath: string;

    @Column({
        name: 'birthday',
        type : 'datetime',
    })
    birthday: Date;

    @OneToMany(type => Publication, publication => publication.writer, {
        cascade : true,

    })
    publications: Publication[];

}
