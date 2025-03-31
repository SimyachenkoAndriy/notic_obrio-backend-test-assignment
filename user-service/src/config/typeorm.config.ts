import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  database: 'mysql-1',
  username: 'user-mysql-1',
  password: '12900921',
  entities: [User],
  synchronize: true,
};
