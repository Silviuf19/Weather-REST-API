import { IsNumber } from 'class-validator';

export class PostTemperatureDto {
  @IsNumber()
  idOras: number;
  @IsNumber()
  valoare: number;
}
