import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  authUser(username: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where({ username })
      .select([
        'user.id',
        'user.username',
        'user.password',
        'roles.id',
        'roles.name',
      ])
      .getOne();
  }
}
