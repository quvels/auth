import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolessRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const newRole = new Role();

    newRole.name = createRoleDto.name;

    const role = await this.rolessRepository.save(newRole);

    return new RoleDto(role);
  }

  async isNameAlreadyTaken(name: string) {
    const roles = await this.rolessRepository.count({ name });
    return roles > 0;
  }
}
