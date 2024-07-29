import { Injectable } from '@nestjs/common';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { UpdateLibrarianDto } from './dto/update-librarian.dto';

@Injectable()
export class LibrarianService {
  create(createLibrarianDto: CreateLibrarianDto) {
    return 'This action adds a new librarian';
  }

  findAll() {
    return `This action returns all librarian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} librarian`;
  }

  update(id: number, updateLibrarianDto: UpdateLibrarianDto) {
    return `This action updates a #${id} librarian`;
  }

  remove(id: number) {
    return `This action removes a #${id} librarian`;
  }
}
