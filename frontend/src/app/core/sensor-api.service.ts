import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SensorApiService {

  constructor(private http: HttpClient) { }

  public getMeasurements(): Observable<any> {
    return this.http.get('http://localhost:3000/sensors/temperatures');
  }
}
