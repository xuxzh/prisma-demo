import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { XzReponseHelper } from 'src/core';

@Injectable()
export class OperationService {
  constructor(private prisma: PrismaService) {}
  async create(createOperationDto: CreateOperationDto) {
    if (!createOperationDto.uuid) {
      createOperationDto.uuid = uuid();
    }
    const data = await this.prisma.operation.create({
      data: createOperationDto,
    });
    console.log('新建的数据', data);
    return XzReponseHelper.success(data, '创建成功');
  }

  async findAll() {
    const data = await this.prisma.operation.findMany();
    return XzReponseHelper.success(data, '获取列表成功');
  }

  async findOne(id: number) {
    const data = await this.prisma.operation.findFirstOrThrow({
      where: {
        id,
      },
    });
    return XzReponseHelper.success(data, '获取详情成功');
  }

  async update(id: number, updateOperationDto: UpdateOperationDto) {
    const data = await this.prisma.operation.update({
      where: { id },
      data: updateOperationDto,
    });
    return XzReponseHelper.success(data, '更新成功');
  }

  async remove(id: number) {
    const data = await this.prisma.operation.delete({
      where: { id },
    });
    return XzReponseHelper.success(data, '删除成功');
  }
}
