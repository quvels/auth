import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

export class RoleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
