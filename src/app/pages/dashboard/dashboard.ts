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

  vin = '';

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

    this.vin = '';

    this.loadVehicleData();

  }

  loadVehicleData(): void {

    if (!this.selectedVehicle) {

      return;

    }

    const vinSelecionado =
      this.VEHICLE_VINS[this.selectedVehicle.vehicle];

    this.vehicleService.getVehicleData(vinSelecionado).subscribe({

      next: (response) => {

        this.vehicleData = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  buscarVin(): void {

    if (!this.vin.trim()) {

      alert('Digite um código VIN.');

      return;

    }

    this.vehicleService.getVehicleData(this.vin).subscribe({

      next: (response) => {

        this.vehicleData = response;

        const vehicle = this.vehicles.find(

          v => v.id === response.id

        );

        if (vehicle) {

          this.selectedVehicle = vehicle;

        }

      },

      error: () => {

        alert('VIN não encontrado.');

      }

    });

  }

}