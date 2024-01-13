import { Module } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { TemperaturesController } from './temperatures.controller';

@Module({
  providers: [TemperaturesService],
  controllers: [TemperaturesController]
})
export class TemperaturesModule {}
