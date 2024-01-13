export interface TemperaturesParams {
  lat?: number;
  lon?: number;
  from?: Date;
  until?: Date;
}

export interface CityTemperatureParams {
  idOras: number;
  from?: Date;
  until?: Date;
}

export interface CountryTemperatureParams {
  idTara: number;
  from?: Date;
  until?: Date;
}
