import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vehicle } from '../../core/models/vehicle.model';
import { VehicleData } from '../../core/models/vehicle-data.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private http = inject(HttpClient);

  private api = 'http://localhost:3001';

  getVehicles(): Observable<{ vehicles: Vehicle[] }> {

    return this.http.get<{ vehicles: Vehicle[] }>(
      `${this.api}/vehicles`
    );

  }

  getVehicleData(vin: string): Observable<VehicleData> {

    return this.http.post<VehicleData>(
      `${this.api}/vehicleData`,
      { vin }
    );

  }

}