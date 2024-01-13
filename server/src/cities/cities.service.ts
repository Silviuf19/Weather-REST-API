import { Injectable } from '@nestjs/common';
import { CustomError, ErrorTypes } from '../error_handling';
import { PostCityDto } from './dto/post-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PutCityDto } from './dto/put-city.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async addCity(city: PostCityDto) {
    const existingCountry = await this.prisma.tari.findUnique({
      where: { id: city.idTara },
    });
    if (!existingCountry) {
      throw new CustomError(
        ErrorTypes.NotFound,
        'Country with this ID not found',
      );
    }
    const checkCity = await this.prisma.orase.findUnique({
      where: {
        id_tara_nume_oras: { id_tara: city.idTara, nume_oras: city.nume },
      },
    });
    if (checkCity) {
      throw new CustomError(
        ErrorTypes.Conflict,
        'City with this name found in this country',
      );
    }
    const newCity = await this.prisma.orase.create({
      data: {
        id_tara: city.idTara,
        nume_oras: city.nume,
        latitudine: city.lat,
        longitudine: city.lon,
      },
    });
    return { id: newCity.id };
  }

  async getCities() {
    const cities = await this.prisma.orase.findMany();
    if (cities.length === 0) return;

    return cities.map((city) => ({
      id: city.id,
      idTara: city.id_tara,
      nume: city.nume_oras,
      lat: city.latitudine,
      lon: city.longitudine,
    }));
  }

  async getCitiesByCountry(idTara: number) {
    const cities = await this.prisma.orase.findMany({
      where: { id_tara: idTara },
    });
    if (cities.length === 0) return;

    return cities.map((city) => ({
      id: city.id,
      idTara: city.id_tara,
      nume: city.nume_oras,
      lat: city.latitudine,
      lon: city.longitudine,
    }));
  }

  async updateCity(id: number, city: PutCityDto) {
    const existingCity = await this.prisma.orase.findUnique({
      where: { id: id },
    });
    if (!existingCity) {
      throw new CustomError(ErrorTypes.NotFound, 'City not found');
    }

    const existingCountry = await this.prisma.tari.findUnique({
      where: { id: city.idTara },
    });
    if (!existingCountry) {
      throw new CustomError(
        ErrorTypes.NotFound,
        'Country with this ID not found',
      );
    }

    const idConflict = await this.prisma.orase.findUnique({
      where: { id: city.id, NOT: { id: id } },
    });
    if (idConflict) {
      throw new CustomError(
        ErrorTypes.Conflict,
        'City with this ID already exists',
      );
    }

    const checkCity = await this.prisma.orase.findUnique({
      where: {
        id_tara_nume_oras: { id_tara: city.idTara, nume_oras: city.nume },
        NOT: { id: id },
      },
    });
    if (checkCity) {
      throw new CustomError(
        ErrorTypes.Conflict,
        'City with this name already found in country',
      );
    }

    await this.prisma.orase.update({
      where: { id: id },
      data: {
        id_tara: city.idTara,
        nume_oras: city.nume,
        latitudine: city.lat,
        longitudine: city.lon,
      },
    });
  }

  async deleteCity(id: number) {
    const existingCity = await this.prisma.orase.findUnique({
      where: { id: id },
    });
    if (!existingCity) {
      throw new CustomError(ErrorTypes.NotFound, 'City not found');
    }
    await this.prisma.orase.delete({ where: { id: id } });
  }
}
