import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  msisdn: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['sub', 'unsub'])
  action: string;

  @IsNotEmpty()
  @IsString()
  accessCode: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['MTN', 'GLO', 'Airtel', '9mobile'])
  provider: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['SMS', 'WEB', 'USSD'])
  channel: string;
}
