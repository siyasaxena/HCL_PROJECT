import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface Warehouse {
  id?: number;
  code: string;
  name: string;
  location: string;
  capacity: number;
}

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouses.html',
  styleUrls: ['./warehouses.scss'],
})
export class WarehouseComponent implements OnInit {
  warehouses: Warehouse[] = [];
  isLoading = false;
  errorMessage = '';

  // Modal & Form State for Creating/Updating Warehouse
  showModal = false;
  newWarehouse: Warehouse = {
    code: '',
    name: '',
    location: '',
    capacity: 0,
  };

  private apiUrl = 'http://localhost:8080/api/warehouses'; // Adjust matching your WarehouseController endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<Warehouse[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.warehouses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching warehouses:', err);
        this.errorMessage = 'Failed to load warehouses. Please check backend connection.';
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.newWarehouse = {
      code: `WH-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      location: '',
      capacity: 1000,
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createWarehouse(): void {
    if (!this.newWarehouse.name || !this.newWarehouse.location) {
      alert('Please fill in all required fields.');
      return;
    }

    this.http.post<Warehouse>(this.apiUrl, this.newWarehouse).subscribe({
      next: () => {
        this.closeModal();
        this.fetchWarehouses();
      },
      error: (err) => {
        console.error('Error creating warehouse:', err);
        alert('Failed to save warehouse.');
      },
    });
  }
}
