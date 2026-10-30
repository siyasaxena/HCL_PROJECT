import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
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

  newProduct: any = {
    sku: '',
    name: '',
    category: '',
    description: '',
    unitPrice: 0,
    quantity: 10,
    reorderLevel: 10,
  };

  searchTerm: string = '';
  selectedCategoryId: string = '';

  // Inject ChangeDetectorRef to force the UI to update
  private cdr = inject(ChangeDetectorRef);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges(); // <-- Forces the HTML table to render immediately
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.warn('Categories API unavailable:', err),
    });
  }

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
      this.closeModal();
      this.productService.updateProduct(this.selectedProductId, this.newProduct).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.warn('Backend update failed:', err),
      });
    } else {
      this.closeModal();
      this.productService.createProduct(this.newProduct).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.warn('Backend create failed:', err),
      });
    }
  }

  deleteProduct(id?: number): void {
    if (!id) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.warn('Backend delete failed:', err),
    });
  }
}
