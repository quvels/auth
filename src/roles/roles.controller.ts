import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@ApiTags('roles')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiCreatedResponse({ type: RoleDto })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return await this.rolesService.create(createRoleDto);
  }
}
