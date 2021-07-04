import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'unique-username', async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(username: string) {
    return !(await this.userService.isUsernameAlreadyTaken(username));
  }

  defaultMessage() {
    return 'username ($value) is already taken';
  }
}
