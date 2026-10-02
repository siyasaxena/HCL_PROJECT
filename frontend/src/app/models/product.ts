export interface Product {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  unitPrice: number;
  reorderLevel: number;
  reorderQuantity: number;
  categoryId?: number;
  categoryName?: string;
  active?: boolean;
}

export interface Category {
  id?: number;
  name: string;
  description?: string;
}
