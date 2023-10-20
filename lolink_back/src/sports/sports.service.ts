import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sports } from './sports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sports) private sportsRepository: Repository<Sports>,
  ) {}

  async getSport(id) {
    const result = await this.sportsRepository.findOne({
      where: { id },
    });

    return result;
  }

  async getSports() {}

  createSport(_sport) {
    // const toto = {
    //   ..._toto,
    //   startAt: new Date(_toto.startAt),
    //   endAt: new Date(_toto.endAt),
    //   finishAt: new Date(_toto.finishAt),
    // };

    // console.log(toto.startAt, toto.endAt);

    return this.sportsRepository.save(_sport);
  }

  async updateSport(_sport, id) {
    const sport = await this.getSport(id);

    if (!sport) {
      throw new NotFoundException('Toto not found');
    }

    await this.sportsRepository.merge(sport, _sport);

    return this.sportsRepository.save(sport);
  }
}
