import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
