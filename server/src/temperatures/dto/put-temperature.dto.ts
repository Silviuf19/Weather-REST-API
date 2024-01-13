import { IsNumber } from 'class-validator';

export class PutTemperatureDto {
  @IsNumber()
  id: number;
  @IsNumber()
  idOras: number;
  @IsNumber()
  valoare: number;
}
