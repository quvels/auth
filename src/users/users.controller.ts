import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { UuidDto } from '@app/core/dto/uuid.dto';
import { Roles } from '@app/roles/decorators/roles.decorator';
import { Role } from '@app/roles/enums/role.enum';
import { RolesGuard } from '@app/roles/guards/roles.guard';

@ApiTags('users')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async findOne(@Param() params: UuidDto): Promise<UserDto> {
    try {
      const user = await this.usersService.findOneOrFail(params.id);
      return user;
    } catch (exception) {
      throw new NotFoundException();
    }
  }

  @ApiOkResponse({ type: UserDto })
  @Patch(':id')
  async update(
    @Param() params: UuidDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user = await this.usersService.findOneOrFail(params.id);
      const updatedUser = await this.usersService.update(user, updateUserDto);
      return updatedUser;
    } catch (exception) {
      throw new NotFoundException();
    }
  }
}
