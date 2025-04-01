import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OperationService {
  constructor(private prisma: PrismaService) {}
  create(createOperationDto: CreateOperationDto) {
    if (!createOperationDto.uuid) {
      createOperationDto.uuid = uuid();
    }
    return this.prisma.operation.create({
      data:createOperationDto
    });
  }

  findAll() {
    return `This action returns all operation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operation`;
  }

  update(id: number, updateOperationDto: UpdateOperationDto) {
    return `This action updates a #${id} operation`;
  }

  remove(id: number) {
    return `This action removes a #${id} operation`;
  }
}
