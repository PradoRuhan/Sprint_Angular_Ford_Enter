import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Header } from '../../shared/header/header';
import { DashboardCard } from '../../shared/dashboard-card/dashboard-card';

import { VehicleService } from '../../core/services/vehicle.service';

import { Vehicle } from '../../core/models/vehicle.model';
import { VehicleData } from '../../core/models/vehicle-data.model';

import { VEHICLE_VINS } from '../../core/constants/vehicle-vins';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    Header,
    DashboardCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  vehicles: Vehicle[] = [];

  selectedVehicle: Vehicle | null = null;

  vehicleData: VehicleData | null = null;

  readonly VEHICLE_VINS = VEHICLE_VINS;

  constructor(
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {

    this.loadVehicles();

  }

  loadVehicles(): void {

    this.vehicleService.getVehicles().subscribe({

      next: (response) => {

        this.vehicles = response.vehicles;

        if (this.vehicles.length > 0) {

          this.selectedVehicle = this.vehicles[0];

          this.loadVehicleData();

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  onVehicleChange(): void {

    this.loadVehicleData();

  }

  loadVehicleData(): void {

    if (!this.selectedVehicle) {

      return;

    }

    const vin = VEHICLE_VINS[this.selectedVehicle.vehicle];

    this.vehicleService.getVehicleData(vin).subscribe({

      next: (response) => {

        this.vehicleData = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}