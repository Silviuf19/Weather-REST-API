import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { TemperaturesModule } from './temperatures/temperatures.module';

@Module({
  imports: [CountriesModule, CitiesModule, TemperaturesModule],
})
export class AppModule {}
