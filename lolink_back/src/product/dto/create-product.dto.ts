import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  hash: string;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  imageUrls: string[];
}
