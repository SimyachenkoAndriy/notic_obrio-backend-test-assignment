import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectQueue('notification-queue')
    private readonly notificationQueue: Queue,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name } = createUserDto;
    const newUser = this.usersRepository.create({ name });
    const savedUser = await this.usersRepository.save(newUser);

    await this.notificationQueue.add(
      'send-notification',
      {
        userId: savedUser.id,
        name: savedUser.name,
      },
      {
        delay: 86400000, // 24 hours in milliseconds
      },
    );

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
