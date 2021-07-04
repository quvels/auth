import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RolesService } from '../roles.service';

@ValidatorConstraint({ name: 'unique-role-name', async: true })
@Injectable()
export class UniqueRoleNameValidator implements ValidatorConstraintInterface {
  constructor(private readonly rolesService: RolesService) {}

  async validate(name: string) {
    return !(await this.rolesService.isNameAlreadyTaken(name));
  }

  defaultMessage() {
    return 'role name ($value) is already taken';
  }
}
