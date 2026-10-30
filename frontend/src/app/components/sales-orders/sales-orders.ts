import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface SalesOrder {
  id?: number;
  createdAt?: string;
  customerName: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
}

@Component({
  selector: 'app-sales-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-orders.html',
  styleUrls: ['./sales-orders.scss'],
})
export class SalesOrderComponent implements OnInit {
  orders: SalesOrder[] = [];
  isLoading = true;
  errorMessage = '';
  isModalOpen = false;

  newOrder: SalesOrder = {
    orderNumber: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    customerName: '',
    status: 'PENDING',
    totalAmount: 0,
  };

  private apiUrl = 'http://localhost:8080/api/sales-orders';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.http.get<SalesOrder[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sales orders:', err);
        this.errorMessage = 'Failed to load sales orders. Please check backend service.';
        this.isLoading = false;
      },
    });
  }

  openCreateModal(): void {
    this.newOrder = {
      orderNumber: 'ORD-' + Date.now(), // ✅ Guaranteed unique using current timestamp
      customerName: '',
      status: 'PENDING',
      totalAmount: 0,
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveOrder(): void {
    this.http.post<SalesOrder>(this.apiUrl, this.newOrder).subscribe({
      next: () => {
        this.isModalOpen = false;
        this.fetchOrders();
      },
      error: (err) => {
        console.error('Error saving sales order:', err);
        alert('Failed to save sales order.');
      },
    });
  }
}
