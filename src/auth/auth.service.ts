import { UserDto } from '@app/users/dto/user.dto';
import { UsersService } from '@app/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<UserDto> {
    return await this.usersService.validateAuthUser(username, password);
  }

  async login(user: UserDto) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
