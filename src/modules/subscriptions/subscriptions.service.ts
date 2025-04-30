import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { User } from '../users/users.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    private httpService: HttpService,
  ) {}

  generateTransactionId(): string {
    const randomPart = crypto.randomBytes(8).toString('hex');
    return `NVS-${randomPart}`;
  }

  async initiateSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
    user: User,
  ) {
    const transactionId = this.generateTransactionId();

    const subscription = this.subscriptionsRepository.create({
      ...createSubscriptionDto,
      transactionID: transactionId,
      status: 'pending',
      user,
    });

    await this.subscriptionsRepository.save(subscription);

    // Simulate processing delay
    setTimeout(async () => {
      try {
        subscription.status = 'active';
        await this.subscriptionsRepository.save(subscription);

        if (user.webhookUrl) {
          const webhookPayload = {
            msisdn: createSubscriptionDto.msisdn,
            network: `createSubscriptionDto.provider`,
            message: 'Success',
            productCode: createSubscriptionDto.productCode,
            transactionId: transactionId,
            requestAction: createSubscriptionDto.action,
            responseAction: `${createSubscriptionDto.action}_active`,
            networkData: {},
          };

          await this.httpService
            .post(user.webhookUrl, webhookPayload)
            .toPromise();
        }
      } catch (error) {
        console.error('Error processing subscription:', error);
      }
    }, 2000);

    return {
      data: {
        message: 'Operation successful',
        transactionId,
        status: true,
      },
      status: 'success',
    };
  }

  async findByTransactionId(
    transactionId: string,
  ): Promise<Subscription | null> {
    return this.subscriptionsRepository.findOne({
      where: { transactionID: transactionId },
    });
  }
}
