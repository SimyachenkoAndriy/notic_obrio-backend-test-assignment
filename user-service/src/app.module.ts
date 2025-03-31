import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './user/user.entity';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/user.service';
import { BullModule } from '@nestjs/bull';
import { typeOrmConfig } from './config/typeorm.config';
import { bullConfig } from './config/bull.config';
import { NotificationQueue } from './queues/notification.queue';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),

    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(NotificationQueue),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
