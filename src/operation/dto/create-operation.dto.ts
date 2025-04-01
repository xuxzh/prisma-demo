import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @ApiProperty()
  ip: string;
  @ApiProperty()
  companyCode: string;
  @ApiProperty()
  uuid: string;
}
