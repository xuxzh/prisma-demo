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
      data: createOperationDto,
    });
  }

  findAll() {
    return this.prisma.operation.findMany();
  }

  findOne(id: number) {
    return this.prisma.operation.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOperationDto: UpdateOperationDto) {
    return this.prisma.operation.update({
      where: { id },
      data: updateOperationDto,
    });
  }

  remove(id: number) {
    return this.prisma.operation.delete({
      where: { id },
    });
  }
}
