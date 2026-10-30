import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcurementService, PurchaseOrder } from '../../services/procurement';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './procurement.html',
  styleUrls: ['./procurement.scss'],
})
export class ProcurementComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  isLoading: boolean = true;
  activeTab: 'orders' | 'suppliers' = 'orders';
  isModalOpen: boolean = false;

  newPo: Partial<PurchaseOrder> = {
    poNumber: '',
    supplierName: '',
    totalAmount: 0,
    status: 'PENDING',
  };

  constructor(private procurementService: ProcurementService) {}

  ngOnInit(): void {
    this.fetchPurchaseOrders();
  }

  fetchPurchaseOrders(): void {
    this.isLoading = true;
    this.procurementService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching purchase orders:', err);
        this.isLoading = false;
      },
    });
  }

  switchTab(tab: 'orders' | 'suppliers'): void {
    this.activeTab = tab;
  }

  openModal(): void {
    this.newPo = {
      poNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      supplierName: '',
      totalAmount: 0,
      status: 'PENDING',
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  savePurchaseOrder(): void {
    this.procurementService.createPurchaseOrder(this.newPo).subscribe({
      next: () => {
        this.closeModal();
        this.fetchPurchaseOrders();
      },
      error: (err) => {
        console.error('Error saving purchase order:', err);
        alert('Failed to save purchase order.');
      },
    });
  }
}
