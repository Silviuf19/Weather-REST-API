import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostTemperatureDto } from './dto/post-temperature.dto';
import { PutTemperatureDto } from './dto/put-temperature.dto';
import { CustomError, ErrorTypes } from 'src/error_handling';
import {
  CityTemperatureParams,
  CountryTemperatureParams,
  TemperaturesParams,
} from './dto/interfaces';
import { format } from 'date-fns';

@Injectable()
export class TemperaturesService {
  constructor(private prisma: PrismaService) {}

  async addTemperature(temperatureDto: PostTemperatureDto) {
    const existingCity = await this.prisma.orase.findUnique({
      where: { id: temperatureDto.idOras },
    });
    if (!existingCity) {
      throw new CustomError(ErrorTypes.NotFound, 'City with this ID not found');
    }
    const temperature = await this.prisma.temperaturi.create({
      data: {
        id_oras: temperatureDto.idOras,
        valoare: temperatureDto.valoare,
      },
    });
    return { id: temperature.id };
  }

  async getTemperatures(params: TemperaturesParams) {
    const { lat, lon, from, until } = params;

    const where = {
      ...(lat && { Orase: { latitudine: lat } }),
      ...(lon && {
        Orase: { ...((lat && { latitudine: lat }) || {}), longitudine: lon },
      }),
      timestamp: {
        ...(from && { gte: new Date(from) }),
        ...(until && { lte: new Date(until) }),
      },
    };

    const temperatures = await this.prisma.temperaturi.findMany({
      where,
    });

    return temperatures.map(({ id, valoare, timestamp }) => ({
      id,
      valoare,
      timestamp: format(timestamp, 'yyyy-MM-dd'),
    }));
  }

  async getTemperaturesByCity(params: CityTemperatureParams) {
    const { idOras, from, until } = params;

    const checkCity = await this.prisma.orase.findUnique({
      where: { id: idOras },
    });
    if (!checkCity) return [];

    const where = {
      id_oras: idOras,
      timestamp: {
        ...(from && { gte: new Date(from) }),
        ...(until && { lte: new Date(until) }),
      },
    };

    const temperatures = await this.prisma.temperaturi.findMany({ where });

    return temperatures.map(({ id, valoare, timestamp }) => ({
      id,
      valoare,
      timestamp: format(timestamp, 'yyyy-MM-dd'),
    }));
  }

  async getTemperaturesByCountry(params: CountryTemperatureParams) {
    const { idTara, from, until } = params;

    const checkCountry = await this.prisma.tari.findUnique({
      where: { id: idTara },
    });
    if (!checkCountry) return [];

    const where = {
      Orase: {
        id_tara: idTara,
      },
      timestamp: {
        ...(from && { gte: new Date(from) }),
        ...(until && { lte: new Date(until) }),
      },
    };

    const temperatures = await this.prisma.temperaturi.findMany({
      where,
    });

    return temperatures.map(({ id, valoare, timestamp }) => ({
      id,
      valoare,
      timestamp: format(timestamp, 'yyyy-MM-dd'),
    }));
  }

  async updateTemperature(id: number, updatedTemp: PutTemperatureDto) {
    const temperature = await this.prisma.temperaturi.findUnique({
      where: { id },
    });
    if (!temperature) {
      throw new CustomError(
        ErrorTypes.NotFound,
        'Temperature with this ID not found',
      );
    }
    const checkId = await this.prisma.temperaturi.findUnique({
      where: { id: updatedTemp.id, NOT: { id } },
    });
    if (checkId) {
      throw new CustomError(
        ErrorTypes.Conflict,
        'Temperature with this ID already exists',
      );
    }

    const existingCity = await this.prisma.orase.findUnique({
      where: { id: updatedTemp.idOras },
    });
    if (!existingCity) {
      throw new CustomError(ErrorTypes.NotFound, 'City with this ID not found');
    }

    await this.prisma.temperaturi.update({
      where: { id },
      data: {
        id: updatedTemp.id,
        valoare: updatedTemp.valoare,
        id_oras: updatedTemp.idOras,
      },
    });
  }

  async deleteTemperature(id: number) {
    const temperature = await this.prisma.temperaturi.findUnique({
      where: { id },
    });
    if (!temperature) {
      throw new CustomError(ErrorTypes.NotFound, 'Temperature not found');
    }
    await this.prisma.temperaturi.delete({ where: { id } });
  }
}
