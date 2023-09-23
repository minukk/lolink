import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  nickname: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  hash: string;
}
