import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { SportsService } from './sports.service';
import { UpdateSportDto } from './dto/update-sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get('')
  async getSports() {}

  @Get('/:id')
  async getSport(@Param() id: string) {
    return this.sportsService.getSport(id);
  }

  @Post('/write')
  createToto(@Body() sport: CreateSportDto) {
    return this.sportsService.createSport(sport);
  }

  @Patch('/:id')
  async updateToto(@Body() sport: UpdateSportDto, @Param() id: string) {
    return this.sportsService.updateSport(sport, id);
  }

  @Post('/delete/:id')
  async deleteToto() {}
}
