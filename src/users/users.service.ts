import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    //Password
    const salt = await bcrypt.genSalt();
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, salt);

    createUserDto.password = hash;

    const user = await this.usersRepository.save(createUserDto);

    return new UserDto(user);
  }

  async update(user: UserDto, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
      password: user.password,
    });
    return new UserDto(updatedUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((u) => new UserDto(u));
  }

  async findOne(id: string): Promise<UserDto> {
    return new UserDto(await this.usersRepository.findOne(id));
  }

  async findOneOrFail(id: string): Promise<UserDto> {
    return new UserDto(await this.usersRepository.findOneOrFail(id));
  }

  async findByUsername(username: string): Promise<UserDto> {
    return new UserDto(await this.usersRepository.findOne({ username }));
  }

  async validateAuthUser(
    username: string,
    password: string,
  ): Promise<UserDto> | null {
    const user = await this.usersRepository.authUser(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const currentUser = { password: null, ...user };
        return currentUser;
      }
    }
    return null;
  }

  async isUsernameAlreadyTaken(username: string) {
    const users = await this.usersRepository.count({ username });
    return users > 0;
  }
}
