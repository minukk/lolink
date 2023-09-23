import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  hash: string;

  @IsString()
  @IsOptional()
  imageUrls: string[];
}
