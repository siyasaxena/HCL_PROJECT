import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface SalesOrder {
  id?: number;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: 'PENDING' | 'RESERVED' | 'SHIPPED' | 'CANCELLED';
  createdAt?: string;
}

@Component({
  selector: 'app-sales-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-orders.html',
  styleUrls: ['./sales-orders.scss'],
})
export class SalesOrderComponent implements OnInit {
  salesOrders: SalesOrder[] = [];
  isLoading = false;
  errorMessage = '';

  // Modal / Form state for creating a new Sales Order
  showModal = false;
  newOrder: SalesOrder = {
    orderNumber: '',
    customerName: '',
    totalAmount: 0,
    status: 'PENDING',
  };

  private apiUrl = 'http://localhost:8080/api/sales-orders'; // Update to match your SalesOrderController endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSalesOrders();
  }

  fetchSalesOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<SalesOrder[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.salesOrders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sales orders:', err);
        this.errorMessage = 'Failed to load sales orders. Please check backend API.';
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.newOrder = {
      orderNumber: `SO-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: '',
      totalAmount: 0,
      status: 'PENDING',
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSalesOrder(): void {
    if (!this.newOrder.customerName || this.newOrder.totalAmount <= 0) {
      alert('Please provide valid customer details and total amount.');
      return;
    }

    this.http.post<SalesOrder>(this.apiUrl, this.newOrder).subscribe({
      next: () => {
        this.closeModal();
        this.fetchSalesOrders();
      },
      error: (err) => {
        console.error('Error creating sales order:', err);
        alert('Failed to save sales order.');
      },
    });
  }
}
