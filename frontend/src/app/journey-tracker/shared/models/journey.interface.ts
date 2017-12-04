import { JourneyLogRecord } from './journey-log-record.interface';

export interface Journey {
  id: number;
  startDate: Date;
  endDate?: Date;
  logRecord?: JourneyLogRecord[];
}
