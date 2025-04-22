import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { v4 as uuid } from 'uuid';
import { XzHttpResponse, XzSafeAny } from 'src/model';
import { XzReponseHelper } from 'src/core';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get('getClientIp')
  getClientIP(@Req() req: Request): XzHttpResponse {
    try {
      const ip = XzReponseHelper.getClienIp(req);
      return XzReponseHelper.success({ clientIp: ip });
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        (error as Record<string, XzSafeAny>)?.message || '获取ip失败',
      );
    }
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() createOperationDto: CreateOperationDto,
  ) {
    try {
      const ip = XzReponseHelper.getClienIp(req);
      if (!createOperationDto.uuid?.trim()) {
        createOperationDto.uuid = uuid();
      }
      createOperationDto.ip = ip;
      return await this.operationService.create(createOperationDto);
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        ((error as Record<string, XzSafeAny>)?.message as string) || '创建失败',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.operationService.findAll();
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        ((error as Record<string, XzSafeAny>)?.message as string) ||
          '获取列表失败',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.operationService.findOne(+id);
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        ((error as Record<string, XzSafeAny>)?.message as string) ||
          '获取详情失败',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    try {
      return await this.operationService.update(+id, updateOperationDto);
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        ((error as Record<string, XzSafeAny>)?.message as string) || '更新失败',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.operationService.remove(+id);
    } catch (error: unknown) {
      return XzReponseHelper.fail(
        ((error as Record<string, XzSafeAny>)?.message as string) || '删除失败',
      );
    }
  }
}
