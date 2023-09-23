import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTotoDto } from './dto/create-toto.dto';
import { TotoService } from './toto.service';
import { UpdateTotoDto } from './dto/update-toto.dto';

@Controller('toto')
export class TotoController {
  constructor(private totoService: TotoService) {}

  @Get('')
  async getTotos() {}

  @Get('/:id')
  async getToto(@Param() id: string) {
    return this.totoService.getToto(id);
  }

  @Post('/write')
  createToto(@Body() toto: CreateTotoDto) {
    return this.totoService.createToto(toto);
  }

  @Patch('/:id')
  async updateToto(@Body() toto: UpdateTotoDto, @Param() id: string) {
    return this.totoService.updateToto(toto, id);
  }

  @Post('/delete/:id')
  async deleteToto() {}
}
