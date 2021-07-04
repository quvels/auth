import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { UniqueUsernameValidator } from '../validators/unique-username.validator';
import { UserRoleDto } from './user-role.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(8)
  @Validate(UniqueUsernameValidator)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: UserRoleDto, isArray: true })
  @IsOptional()
  roles?: UserRoleDto[];
}
