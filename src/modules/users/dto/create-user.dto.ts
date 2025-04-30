import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  productAmount: number;

  @IsNotEmpty()
  @IsString()
  accessCode: string;
}
