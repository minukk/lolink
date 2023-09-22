import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  nickname: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  providerId: string;

  @IsNumber()
  point: number = 0;
}
