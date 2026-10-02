import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // --- Warehouses & Inventory ---
  getWarehouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouses`);
  }

  getInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/inventory`);
  }

  adjustStock(adjustment: {
    sku: string;
    warehouseCode: string;
    quantityDelta: number;
    reason?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/inventory/adjustments`, adjustment);
  }

  // --- Stock Transfers ---
  getTransfers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transfers`);
  }

  createTransfer(transfer: {
    sourceWarehouse: string;
    targetWarehouse: string;
    itemCount: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transfers`, transfer);
  }

  dispatchTransfer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transfers/${id}/dispatch`, {});
  }

  receiveTransfer(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transfers/${id}/receive`, {});
  }

  // --- Sales Orders ---
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  createOrder(order: { customerName: string; totalAmount: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order);
  }

  shipOrder(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders/${id}/ship`, {});
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders/${id}/cancel`, {});
  }

  // --- Suppliers & Procurement ---
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/suppliers`);
  }

  createSupplier(supplier: {
    code: string;
    name: string;
    email: string;
    phone: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/suppliers`, supplier);
  }

  getPurchaseOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/purchase-orders`);
  }

  createPurchaseOrder(po: { supplierName: string; expectedDate: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/purchase-orders`, po);
  }

  receivePurchaseOrder(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/purchase-orders/${id}/receive`, {});
  }
}
