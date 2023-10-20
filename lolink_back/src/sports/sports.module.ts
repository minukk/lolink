import { Logger, Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sports } from './sports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sports])],
  controllers: [SportsController],
  providers: [SportsService, Logger],
})
export class TotoModule {}
