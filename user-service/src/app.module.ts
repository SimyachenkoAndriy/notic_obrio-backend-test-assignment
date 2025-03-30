import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './user/user.entity';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/user.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      database: 'mysql-1',
      username: 'user-mysql-1',
      password: '12900921',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
