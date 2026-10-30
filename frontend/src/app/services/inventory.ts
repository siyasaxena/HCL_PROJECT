import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id?: number;
  sku: string;
  productName: string;
  warehouseCode: string;
  quantity: number;
  reservedQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  createInventory(item: InventoryItem): Observable<any> {
    return this.http.post(this.apiUrl, item, { responseType: 'text' as 'json' });
  }
}
