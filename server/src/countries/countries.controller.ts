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
import { CountriesService } from './countries.service';
import { handleError } from 'src/error_handling';
import { GetCountryDto, PostCountryDto } from './dto';

@Controller('api/countries/')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Post()
  async addCountry(@Body() countryDto: PostCountryDto) {
    try {
      return await this.countriesService.addCountry(countryDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Get()
  async getCountries() {
    return await this.countriesService.getCountries();
  }

  @Put(':id')
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() country: GetCountryDto,
  ) {
    try {
      await this.countriesService.updateCountry(id, country);
    } catch (err) {
      handleError(err);
    }
  }
  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.countriesService.deleteCountry(id);
    } catch (err) {
      handleError(err);
    }
  }
}
