import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      user: {
        id: user.id,
        email: user.email,
        productCode: user.productCode,
        productAmount: user.productAmount,
        accessCode: user.accessCode,
        webhookUrl: user.webhookUrl,
      },
      apiToken: user.apiToken,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new BadRequestException('No user found');
    return {
      user: {
        id: user.id,
        email: user.email,
        productCode: user.productCode,
        productAmount: user.productAmount,
        accessCode: user.accessCode,
        webhookUrl: user.webhookUrl,
      },
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    if (user.id !== id) {
      throw new Error('Unauthorized');
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        productCode: updatedUser.productCode,
        productAmount: updatedUser.productAmount,
        accessCode: updatedUser.accessCode,
        webhookUrl: updatedUser.webhookUrl,
      },
    };
  }

  @Put(':id/webhook')
  @UseGuards(AuthGuard('jwt'))
  async updateWebhookUrl(
    @Param('id') id: string,
    @Body('webhookUrl') webhookUrl: string,
    @GetUser() user: User,
  ) {
    if (user.id !== id) {
      throw new Error('Unauthorized');
    }
    const updatedUser = await this.usersService.updateWebhookUrl(
      id,
      webhookUrl,
    );
    return {
      user: {
        id: updatedUser.id,
        webhookUrl: updatedUser.webhookUrl,
      },
    };
  }
}
