import { IsString, IsNumber } from 'class-validator';

export class GetCountryDto {
  @IsNumber()
  id: number;

  @IsString()
  nume: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}
