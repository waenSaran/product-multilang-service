import { Injectable } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';

@Injectable()
export class DetailsService {
  create(createDetailDto: CreateDetailDto) {
    console.log('createDetailDto', createDetailDto);
    return 'This action adds a new detail';
  }

  findAll() {
    return `This action returns all details`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detail`;
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    console.log('updateDetailDto', updateDetailDto);
    return `This action updates a #${id} detail`;
  }

  remove(id: number) {
    return `This action removes a #${id} detail`;
  }
}
