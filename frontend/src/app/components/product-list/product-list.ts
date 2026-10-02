import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Product, Category } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  showModal: boolean = false;
  isEditMode: boolean = false;
  selectedProductId: number | null = null;

  // Form Model
  newProduct: Product = {
    sku: '',
    name: '',
    unitPrice: 0,
    reorderLevel: 10,
    reorderQuantity: 50,
  };

  // Search & Filter state
  searchTerm: string = '';
  selectedCategoryId: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: () => {
        // Fallback demo data if backend fails
        if (this.products.length === 0) {
          this.products = [
            {
              id: 1,
              sku: 'PROD-101',
              name: 'Wireless Optical Mouse',
              unitPrice: 25.99,
              reorderLevel: 10,
              reorderQuantity: 50,
            },
            {
              id: 2,
              sku: 'PROD-102',
              name: 'Wired Mouse',
              unitPrice: 39.99,
              reorderLevel: 5,
              reorderQuantity: 20,
            },
          ];
        }
      },
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.warn('Categories API unavailable:', err),
    });
  }

  // Filtered getter for live table rendering
  get filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const matchesSearch =
        !this.searchTerm.trim() ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        !this.selectedCategoryId ||
        (product as any).categoryId?.toString() === this.selectedCategoryId;

      return matchesSearch && matchesCategory;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedProductId = null;
    this.newProduct = { sku: '', name: '', unitPrice: 0, reorderLevel: 10, reorderQuantity: 50 };
    this.showModal = true;
  }

  openEditModal(product: Product): void {
    this.isEditMode = true;
    this.selectedProductId = product.id ?? null;
    this.newProduct = { ...product };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveProduct(): void {
    if (this.isEditMode && this.selectedProductId) {
      // 1. UPDATE EXISTING PRODUCT
      const index = this.products.findIndex((p) => p.id === this.selectedProductId);
      if (index !== -1) {
        this.products[index] = { ...this.newProduct, id: this.selectedProductId };
        this.products = [...this.products];
      }
      this.closeModal();

      this.productService.updateProduct(this.selectedProductId, this.newProduct).subscribe({
        next: () => console.log('Updated in backend successfully'),
        error: (err) => console.warn('Backend update failed, kept local change:', err),
      });
    } else {
      // 2. CREATE NEW PRODUCT
      const productToAdd: Product = {
        ...this.newProduct,
        id: Date.now(),
      };
      this.products = [...this.products, productToAdd];
      this.closeModal();

      this.productService.createProduct(this.newProduct).subscribe({
        next: () => console.log('Created in backend successfully'),
        error: (err) => console.warn('Backend create failed, kept local copy:', err),
      });
    }
  }

  deleteProduct(id?: number): void {
    if (!id) return;
    this.products = this.products.filter((p) => p.id !== id);
    this.productService.deleteProduct(id).subscribe({
      next: () => console.log('Deleted from backend successfully'),
      error: (err) => console.warn('Backend delete failed, removed locally:', err),
    });
  }
}
