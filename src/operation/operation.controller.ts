import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { v4 as uuid } from 'uuid';


@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get('getClientIp')
  getClientIP(@Req() req: Request) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const xRealIp = req.headers['x-real-ip'];
    
    if (xForwardedFor) {
      const ips = Array.isArray(xForwardedFor) 
        ? xForwardedFor[0] 
        : xForwardedFor;
      return { clientIp: ips.split(',')[0].trim() };
    }
    
    if (xRealIp) {
      return { clientIp: Array.isArray(xRealIp) ? xRealIp[0] : xRealIp };
    }
    
    // NestJS 内置的 ip 获取（推荐）
    return { clientIp: (req as any).socket.remoteAddress };
  }

  @Post()
  create(@Req() req: Request,@Body() createOperationDto: CreateOperationDto) {
    const ip = this.getClientIP(req).clientIp;
    if(!createOperationDto.uuid?.trim()){
      createOperationDto.uuid=uuid();
    }
    createOperationDto.ip=ip;
    return this.operationService.create(createOperationDto);
  }

  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(+id);
  }
}
