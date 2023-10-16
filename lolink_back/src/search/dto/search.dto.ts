import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @Matches(/^[a-zA-Z0-9가-힣]*$/, {
    message: '검색어는 영문, 숫자, 한글만 포함해야 합니다.',
  })
  query: string;
}
