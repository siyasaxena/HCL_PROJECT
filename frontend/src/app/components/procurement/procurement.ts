import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface PurchaseOrder {
  id?: number;
  poNumber: string;
  supplierName: string;
  expectedDate: string;
  status: 'DRAFT' | 'SUBMITTED' | 'RECEIVED' | 'CANCELLED';
}

export interface Supplier {
  id?: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './procurement.html',
  styleUrls: ['./procurement.scss'],
})
export class ProcurementComponent implements OnInit {
  activeTab: 'orders' | 'suppliers' = 'orders';

  purchaseOrders: PurchaseOrder[] = [];
  suppliers: Supplier[] = [];

  isLoading = false;
  errorMessage = '';

  // Modal / Form state for creating a Purchase Order
  showPoModal = false;
  newPo: PurchaseOrder = {
    poNumber: '',
    supplierName: '',
    expectedDate: '',
    status: 'DRAFT',
  };

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  setTab(tab: 'orders' | 'suppliers'): void {
    this.activeTab = tab;
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.activeTab === 'orders') {
      this.http.get<PurchaseOrder[]>(`${this.baseUrl}/purchase-orders`).subscribe({
        next: (data) => {
          this.purchaseOrders = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching purchase orders:', err);
          this.errorMessage = 'Failed to load purchase orders.';
          this.isLoading = false;
        },
      });
    } else {
      this.http.get<Supplier[]>(`${this.baseUrl}/suppliers`).subscribe({
        next: (data) => {
          this.suppliers = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching suppliers:', err);
          this.errorMessage = 'Failed to load suppliers.';
          this.isLoading = false;
        },
      });
    }
  }

  openPoModal(): void {
    this.newPo = {
      poNumber: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
      supplierName: '',
      expectedDate: '',
      status: 'DRAFT',
    };
    this.showPoModal = true;
  }

  closePoModal(): void {
    this.showPoModal = false;
  }

  createPurchaseOrder(): void {
    if (!this.newPo.supplierName || !this.newPo.expectedDate) {
      alert('Please fill in all required fields.');
      return;
    }

    this.http.post<PurchaseOrder>(`${this.baseUrl}/purchase-orders`, this.newPo).subscribe({
      next: () => {
        this.closePoModal();
        this.fetchData();
      },
      error: (err) => {
        console.error('Error creating purchase order:', err);
        alert('Failed to create Purchase Order.');
      },
    });
  }
}
