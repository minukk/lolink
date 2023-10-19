import { Logger, Module } from '@nestjs/common';
import { TotoController } from './sports.controller';
import { TotoService } from './sports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toto } from './sports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Toto])],
  controllers: [TotoController],
  providers: [TotoService, Logger],
})
export class TotoModule {}
