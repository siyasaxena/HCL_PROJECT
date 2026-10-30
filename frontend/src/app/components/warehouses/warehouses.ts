import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarehouseService, Warehouse } from '../../services/warehouse';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouses.html',
  styleUrls: ['./warehouses.scss'],
})
export class WarehousesComponent implements OnInit {
  warehouses: Warehouse[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;

  newWarehouse: Warehouse = {
    code: '',
    name: '',
    location: '',
    address: '',
    capacity: 5000,
    managerName: '',
    contactPhone: '',
  };

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses(): void {
    this.isLoading = true;
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching warehouses:', err);
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.newWarehouse = {
      code: `WH-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      location: '',
      address: '',
      capacity: 5000,
      managerName: '',
      contactPhone: '',
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveWarehouse(): void {
    if (!this.newWarehouse.name || !this.newWarehouse.code) {
      alert('Please fill out Name and Code fields.');
      return;
    }

    this.warehouseService.createWarehouse(this.newWarehouse).subscribe({
      next: () => {
        this.closeModal();
        this.fetchWarehouses();
      },
      error: (err) => {
        console.error('Error saving warehouse:', err);
        this.closeModal();
        this.fetchWarehouses();
      },
    });
  }
}
