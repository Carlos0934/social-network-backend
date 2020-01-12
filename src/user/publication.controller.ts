
import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards, Res, HttpStatus, Req, HttpCode } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { Publication } from 'src/database/entities/publications.entity';
import { TokenGuard } from './token.guard';

@Controller('api/users/:id/publications')
@UseGuards(TokenGuard)
export class PublicationController {

    constructor(
        private service: PublicationService,
    ) {}

    @Get()
    public async GetPublicationsByUser(@Param('id') id: number) {
        return await this.service.GetByUser(id);
    }

    @Get(':publication')
    public async GetOnePublicationByUser(@Param() params: number[]) {
        return await this.service.GetOneByUser(params[0], params[1]);
    }

    @Post()
    public async CreatePublication(@Param('id') id: number, @Body() publication: Publication) {
        return await this.service.Save(id, publication);
    }

    @Delete(':publication')
    public async DeletePublication(@Param('publication') id: number ) {
        if (await this.service.Delete(id)) {
            return {
                message: 'Publication Deleted Success',
            };
        }
        return {
            message: 'Publication Not Found',
        };
    }

}
