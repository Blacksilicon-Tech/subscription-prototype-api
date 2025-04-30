import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsUrl()
  webhookUrl?: string;

  @IsOptional()
  @IsString()
  productCode?: string;

  @IsOptional()
  productAmount?: number;

  @IsOptional()
  @IsString()
  accessCode?: string;
}
