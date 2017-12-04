export interface MeasurementLog {
  measurementTimeSpan: Date;
  temperature: number;
  isWithinAlertRange: boolean;
  isEndangered: boolean;
}
