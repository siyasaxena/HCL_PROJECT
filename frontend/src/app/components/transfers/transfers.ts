import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export interface TransferOrder {
  id?: number;
  transferNumber: string;
  sourceWarehouse: string;
  targetWarehouse: string;
  itemCount: number;
  status: 'DRAFT' | 'DISPATCHED' | 'RECEIVED';
  createdAt?: string;
}

@Component({
  selector: 'app-transfer-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfers.html',
  styleUrls: ['./transfers.scss'],
})
export class TransferOrderComponent implements OnInit {
  transferOrders: TransferOrder[] = [];
  isLoading = false;
  errorMessage = '';

  // Modal / Form state for creating a Transfer Order
  showModal = false;
  newTransfer: TransferOrder = {
    transferNumber: '',
    sourceWarehouse: '',
    targetWarehouse: '',
    itemCount: 1,
    status: 'DRAFT',
  };

  private apiUrl = 'http://localhost:8080/api/transfer-orders'; // Update to match your TransferOrderController endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransferOrders();
  }

  fetchTransferOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<TransferOrder[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.transferOrders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transfer orders:', err);
        this.errorMessage = 'Failed to load transfer orders. Please check backend API.';
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.newTransfer = {
      transferNumber: `TO-${Math.floor(10000 + Math.random() * 90000)}`,
      sourceWarehouse: '',
      targetWarehouse: '',
      itemCount: 1,
      status: 'DRAFT',
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createTransferOrder(): void {
    if (!this.newTransfer.sourceWarehouse || !this.newTransfer.targetWarehouse) {
      alert('Please specify source and target warehouses.');
      return;
    }

    if (this.newTransfer.sourceWarehouse === this.newTransfer.targetWarehouse) {
      alert('Source and Target warehouses cannot be the same.');
      return;
    }

    this.http.post<TransferOrder>(this.apiUrl, this.newTransfer).subscribe({
      next: () => {
        this.closeModal();
        this.fetchTransferOrders();
      },
      error: (err) => {
        console.error('Error creating transfer order:', err);
        alert('Failed to save transfer order.');
      },
    });
  }
}
