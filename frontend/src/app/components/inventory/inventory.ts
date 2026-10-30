import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../services/inventory';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
})
export class InventoryComponent implements OnInit {
  inventoryList: InventoryItem[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;

  newItem: InventoryItem = {
    sku: '',
    productName: '',
    warehouseCode: '',
    quantity: 100,
    reservedQuantity: 0,
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.isLoading = true;
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventoryList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.newItem = {
      sku: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      productName: '',
      warehouseCode: 'WH-001',
      quantity: 100,
      reservedQuantity: 0,
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveStock(): void {
    if (!this.newItem.sku || !this.newItem.productName) {
      alert('Please fill out SKU and Product Name.');
      return;
    }

    this.inventoryService.createInventory(this.newItem).subscribe({
      next: () => {
        this.closeModal();
        this.fetchInventory();
      },
      error: (err) => {
        console.error('Error saving stock:', err);
        this.closeModal();
        this.fetchInventory();
      },
    });
  }
}
