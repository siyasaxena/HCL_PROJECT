import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-stock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Inventory Stock Balances</h1>
      <div class="bg-white rounded shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Product ID</th>
              <th class="p-3 text-left">Warehouse ID</th>
              <th class="p-3 text-left">Quantity</th>
              <th class="p-3 text-left">Reserved Quantity</th>
              <th class="p-3 text-left">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of stockList" class="border-b">
              <td class="p-3">{{ item.id }}</td>
              <td class="p-3">{{ item.productId }}</td>
              <td class="p-3">{{ item.warehouseId }}</td>
              <td class="p-3 font-semibold">{{ item.quantity }}</td>
              <td class="p-3 text-amber-600">{{ item.reservedQuantity || 0 }}</td>
              <td class="p-3 text-green-600 font-bold">
                {{ item.quantity - (item.reservedQuantity || 0) }}
              </td>
            </tr>
            <tr *ngIf="stockList.length === 0">
              <td colspan="6" class="p-4 text-center text-gray-500">No stock data available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class InventoryStockComponent implements OnInit {
  private http = inject(HttpClient);
  stockList: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('/api/inventory').subscribe({
      next: (data) => (this.stockList = data),
      error: (err) => console.error('Error fetching inventory stock:', err),
    });
  }
}
