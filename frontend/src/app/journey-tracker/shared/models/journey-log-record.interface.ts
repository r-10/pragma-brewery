import { MeasurementLog } from './measurement-log.interface';

export interface JourneyLogRecord {
  beerId: number;
  title: string;
  logs: MeasurementLog[];
  currentTemperature: number;
  minIdealTemperature: number;
  maxIdealTemperature: number;
  status: string; // 'ok' | 'warning' | 'endangered';
}
