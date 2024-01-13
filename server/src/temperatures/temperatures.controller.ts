import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { handleError } from 'src/error_handling';
import { PostTemperatureDto } from './dto/post-temperature.dto';
import {
  TemperaturesParams,
  CityTemperatureParams,
  CountryTemperatureParams,
} from './dto/interfaces';
import { PutTemperatureDto } from './dto/put-temperature.dto';
import { parseDates } from './helpers';

@Controller('api/temperatures/')
export class TemperaturesController {
  constructor(private temperaturesService: TemperaturesService) {}

  @Post()
  async addTemperature(@Body() temperatureDto: PostTemperatureDto) {
    try {
      return await this.temperaturesService.addTemperature(temperatureDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Get()
  async getTemperatures(
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
    @Query('from') from?: string,
    @Query('until') until?: string,
  ) {
    try {
      const dates = parseDates(from, until);
      return await this.temperaturesService.getTemperatures({
        lat: !isNaN(lat) ? +lat : undefined,
        lon: !isNaN(lat) ? +lon : undefined,
        from: dates.from,
        until: dates.until,
      } as TemperaturesParams);
    } catch (err) {
      handleError(err);
    }
  }

  @Get('cities/:id_oras?')
  async getTemperaturesByCity(
    @Param('id_oras') id_oras?: string,
    @Query('from') from?: string,
    @Query('until') until?: string,
  ) {
    try {
      if (isNaN(+id_oras)) {
        return [];
      }
      const dates = parseDates(from, until);
      return await this.temperaturesService.getTemperaturesByCity({
        idOras: +id_oras,
        from: dates.from,
        until: dates.until,
      } as CityTemperatureParams);
    } catch (err) {
      handleError(err);
    }
  }

  @Get('countries/:id_tara?')
  async getTemperaturesByCountry(
    @Param('id_tara') id_tara?: string,
    @Query('from') from?: string,
    @Query('until') until?: string,
  ) {
    try {
      if (isNaN(+id_tara)) {
        return [];
      }
      const dates = parseDates(from, until);
      return await this.temperaturesService.getTemperaturesByCountry({
        idTara: +id_tara,
        from: dates.from,
        until: dates.until,
      } as CountryTemperatureParams);
    } catch (err) {
      handleError(err);
    }
  }

  @Put(':id')
  async updateTemperature(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTemp: PutTemperatureDto,
  ) {
    try {
      return await this.temperaturesService.updateTemperature(id, updatedTemp);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  async deleteTemperature(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.temperaturesService.deleteTemperature(id);
    } catch (err) {
      handleError(err);
    }
  }
}
