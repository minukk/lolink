import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTotoDto {
  @IsString()
  @IsOptional()
  content: string;

  @IsInt()
  @IsOptional()
  point: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  startAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  endAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  finishAt: Date;
}
