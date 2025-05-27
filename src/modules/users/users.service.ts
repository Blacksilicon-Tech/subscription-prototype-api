import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Subscription } from '../subscriptions/subscription.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    user.generateApiToken();
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updateWebhookUrl(email: string, webhookUrl: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.webhookUrl = webhookUrl;
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}

export type SafeUser = {
  id: string;
  email: string;
  productCode: string;
  productAmount: number;
  accessCode: string;
  webhookUrl: string;
  apiToken: string;
  subscriptions: Subscription[];
  // add any other non-sensitive fields you want to include
};
