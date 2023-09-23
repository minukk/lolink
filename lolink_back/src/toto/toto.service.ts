import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Toto } from './toto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TotoService {
  constructor(
    @InjectRepository(Toto) private totoRepository: Repository<Toto>,
  ) {}

  async getToto(id) {
    const result = await this.totoRepository.findOne({
      where: { id },
    });

    return result;
  }

  async getTotos() {}

  createToto(_toto) {
    // const toto = {
    //   ..._toto,
    //   startAt: new Date(_toto.startAt),
    //   endAt: new Date(_toto.endAt),
    //   finishAt: new Date(_toto.finishAt),
    // };

    // console.log(toto.startAt, toto.endAt);

    return this.totoRepository.save(_toto);
  }

  async updateToto(_toto, id) {
    const toto = await this.getToto(id);

    if (!toto) {
      throw new NotFoundException('Toto not found');
    }

    await this.totoRepository.merge(toto, _toto);

    return this.totoRepository.save(toto);
  }
}
