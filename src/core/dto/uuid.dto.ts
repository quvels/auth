import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UuidDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
