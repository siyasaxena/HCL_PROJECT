import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: string;
  orderDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {
  private apiUrl = 'http://localhost:8080/api/sales-orders';

  constructor(private http: HttpClient) {}

  // Fetch all sales orders
  getSalesOrders(): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(this.apiUrl);
  }

  // Create a new sales order
  createOrder(order: Partial<SalesOrder>): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(this.apiUrl, order);
  }
}
