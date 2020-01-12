import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { User} from '../database/entities/user.entity';
import { Publication } from 'src/database/entities/publications.entity';

@Injectable()
export class PublicationService {

    constructor(
         @InjectRepository(User) private userRepository: Repository<User>,
         @InjectRepository(Publication) private publicationRepository: Repository<Publication>,
    ) {}

    public async GetAll() {
        return await this.publicationRepository.find();
    }

    public async GetByUser(userId: number) {

        return await this.publicationRepository.find({writer : { id : userId} });
    }

    public async GetOneByUser(userId: number, id: number) {
        return await this.publicationRepository.findOne({  id , writer : {id : userId} });
    }

    public async Save(userId: number , publication: Publication) {

        publication.writer = await this.userRepository.findOne(userId);
        return await this.publicationRepository.save(publication);
    }

    public async Delete( id: number) {
        return  (await this.publicationRepository.delete(id)).affected > 0;
    }
}
