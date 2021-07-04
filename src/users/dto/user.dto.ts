import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRoleDto } from './user-role.dto';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @Exclude()
  password?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  roles: UserRoleDto[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
