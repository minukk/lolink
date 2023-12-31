import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  imageUrls: string;
}
