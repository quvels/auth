import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, Validate } from 'class-validator';
import { UniqueUsernameValidator } from '../validators/unique-username.validator';
import { UserRoleDto } from './user-role.dto';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(8)
  @Validate(UniqueUsernameValidator)
  username?: string;

  @ApiProperty({ type: UserRoleDto, isArray: true })
  @IsOptional()
  roles?: UserRoleDto[];
}
