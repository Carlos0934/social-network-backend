import { Entity , Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('publications')
export class  Publication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    likes: number;

    @Column()
    dislikes: number;

    @Column()
    day: Date;

    @ManyToOne(type => User, user => user.publications, {

    })
    writer: User;
}
