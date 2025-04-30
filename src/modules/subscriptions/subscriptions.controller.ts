import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/users.entity';
import { ApiTokenGuard } from './api-token.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('initiate')
  @UseGuards(ApiTokenGuard) // Use the new guard instead of AuthGuard('jwt')
  async initiate(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @GetUser() user: User, // This will now come from ApiTokenGuard
  ) {
    return this.subscriptionsService.initiateSubscription(
      createSubscriptionDto,
      user,
    );
  }
  @Get('status/:transactionId')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(
    @Param('transactionId') transactionId: string,
    @GetUser() user: User,
  ) {
    const subscription =
      await this.subscriptionsService.findByTransactionId(transactionId);
    if (!subscription || subscription.user.id !== user.id) {
      throw new Error('Subscription not found');
    }
    return subscription;
  }
}
