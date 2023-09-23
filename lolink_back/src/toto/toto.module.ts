import { Module } from '@nestjs/common';
import { TotoController } from './toto.controller';
import { TotoService } from './toto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toto } from './toto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Toto])],
  controllers: [TotoController],
  providers: [TotoService],
})
export class TotoModule {}
