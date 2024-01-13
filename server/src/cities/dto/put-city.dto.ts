import { IsNumber, IsString } from 'class-validator';

export class PutCityDto {
  @IsNumber()
  id: number;
  @IsNumber()
  idTara: number;
  @IsString()
  nume: string;
  @IsNumber()
  lat: number;
  @IsNumber()
  lon: number;
}
