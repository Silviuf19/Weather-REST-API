import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostCityDto } from './dto/post-city.dto';
import { handleError } from 'src/error_handling';
import { CitiesService } from './cities.service';
import { PutCityDto } from './dto/put-city.dto';

@Controller('api/cities/')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Post()
  async addCity(@Body() cityDto: PostCityDto) {
    try {
      return await this.citiesService.addCity(cityDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Get()
  async getCities() {
    try {
      return await this.citiesService.getCities();
    } catch (err) {
      handleError(err);
    }
  }
  @Get('country/:id_Tara?')
  async getCitiesByCountry(@Param('id_Tara') idTara: string) {
    try {
      if (isNaN(+idTara)) {
        return;
      }
      return await this.citiesService.getCitiesByCountry(+idTara);
    } catch (err) {
      handleError(err);
    }
  }

  @Put(':id')
  async updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() city: PutCityDto,
  ) {
    try {
      await this.citiesService.updateCity(id, city);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  async deleteCity(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.citiesService.deleteCity(id);
    } catch (err) {
      handleError(err);
    }
  }
}
