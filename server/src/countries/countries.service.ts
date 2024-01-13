import { Injectable } from '@nestjs/common';
import { CustomError, ErrorTypes } from '../error_handling';
import { GetCountryDto, PostCountryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async addCountry(createCountryDto: PostCountryDto): Promise<{ id: number }> {
    const checkCountry = await this.prisma.tari.findUnique({
      where: { nume_tara: createCountryDto.nume },
    });
    if (checkCountry) {
      throw new CustomError(ErrorTypes.Conflict, 'Country already exists');
    }
    const country = await this.prisma.tari.create({
      data: {
        nume_tara: createCountryDto.nume,
        latitudine: createCountryDto.lat,
        longitudine: createCountryDto.lon,
      },
    });
    return { id: country.id };
  }

  async getCountries(): Promise<GetCountryDto[]> {
    const countries = await this.prisma.tari.findMany();
    if (countries.length === 0) return;

    return countries.map((country) => ({
      id: country.id,
      nume: country.nume_tara,
      lat: country.latitudine,
      lon: country.longitudine,
    }));
  }

  async updateCountry(currentId: number, updateData: GetCountryDto) {
    const existingCountry = await this.prisma.tari.findUnique({
      where: { id: currentId },
    });
    if (!existingCountry) {
      throw new CustomError(ErrorTypes.NotFound, 'Country does not exist');
    }

    if (updateData.id && updateData.id !== currentId) {
      const idConflict = await this.prisma.tari.findUnique({
        where: { id: updateData.id },
      });
      if (idConflict) {
        throw new CustomError(
          ErrorTypes.Conflict,
          'Another country with this ID already exists',
        );
      }
    }

    if (updateData.nume !== existingCountry.nume_tara) {
      const nameConflict = await this.prisma.tari.findFirst({
        where: { nume_tara: updateData.nume, NOT: { id: currentId } },
      });
      if (nameConflict) {
        throw new CustomError(
          ErrorTypes.Conflict,
          'Another country with this name already exists',
        );
      }
    }

    await this.prisma.tari.update({
      where: { id: currentId },
      data: {
        id: updateData.id,
        nume_tara: updateData.nume,
        latitudine: updateData.lat,
        longitudine: updateData.lon,
      },
    });
  }

  async deleteCountry(id: number) {
    const existingCountry = await this.prisma.tari.findUnique({
      where: { id: id },
    });
    if (!existingCountry) {
      throw new CustomError(ErrorTypes.NotFound, 'Country does not exist');
    }
    await this.prisma.tari.delete({ where: { id: id } });
  }
}
