import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async search(@Query() searchDto: SearchDto) {
    // 검색 로직
    return await this.searchService.search(searchDto.query);
  }
}
