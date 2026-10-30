import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
  id?: number;
  poNumber: string;
  supplierName: string;
  totalAmount: number;
  status: string;
  orderDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProcurementService {
  private apiUrl = 'http://localhost:8080/api/purchase-orders';

  constructor(private http: HttpClient) {}

  // Fetch all purchase orders
  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.apiUrl);
  }

  // Create a new purchase order
  createPurchaseOrder(po: Partial<PurchaseOrder>): Observable<any> {
    return this.http.post(this.apiUrl, po, { responseType: 'text' as 'json' });
  }
}
