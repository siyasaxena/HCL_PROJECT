import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface InventoryStock {
  id: number;
  sku: string;
  productName: string;
  warehouseCode: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity?: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryStock[] = [];
  isLoading = true;
  errorMessage = '';

  private apiUrl = 'http://localhost:8080/api/inventory'; // Ensure this matches your backend InventoryController endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.isLoading = true;
    this.http.get<InventoryStock[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.inventoryItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching inventory stock:', err);
        this.errorMessage = 'Failed to load inventory stock. Please check backend service.';
        this.isLoading = false;
      },
    });
  }

  // Fallback calculation for available quantity if not returned directly by API
  getAvailable(item: InventoryStock): number {
    if (item.availableQuantity !== undefined) {
      return item.availableQuantity;
    }
    const q = item.quantity || 0;
    const r = item.reservedQuantity || 0;
    return q - r;
  }
}
