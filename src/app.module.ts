import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', // or whatever database you're using
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // be careful with this in production
    }),
    HttpModule,
    UsersModule,
    AuthModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
