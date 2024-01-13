import { IsNumber, IsString } from 'class-validator';

export class PostCountryDto {
  @IsString()
  nume: string;
  @IsNumber()
  lat: number;
  @IsNumber()
  lon: number;
}
