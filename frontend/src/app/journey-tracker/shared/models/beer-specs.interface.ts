export interface BeerSpecs {
  id: number;
  title: string;
  minIdealTemperature: number;
  maxIdealTemperature: number;
  alertRange: number;
  spoilageTimeSeconds: number;
}
