import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOperationDto } from './create-operation.dto';

export class UpdateOperationDto extends PartialType(CreateOperationDto) {
}
