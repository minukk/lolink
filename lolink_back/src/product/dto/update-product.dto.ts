import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  location_detail: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  imageUrls: string;
}
