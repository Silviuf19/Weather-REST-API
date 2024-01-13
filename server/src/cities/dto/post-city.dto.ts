import { IsNumber, IsString } from 'class-validator';

export class PostCityDto {
  @IsNumber()
  idTara: number;
  @IsString()
  nume: string;
  @IsNumber()
  lat: number;
  @IsNumber()
  lon: number;
}
