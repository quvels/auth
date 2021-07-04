import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { UniqueRoleNameValidator } from '../validators/unique-role-name.validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(8)
  @Validate(UniqueRoleNameValidator)
  name: string;
}
