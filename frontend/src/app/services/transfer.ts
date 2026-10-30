import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransferOrder {
  id: number;
  transferCode: string;
  sourceWarehouse: string;
  destinationWarehouse: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = 'http://localhost:8080/api/transfers';

  constructor(private http: HttpClient) {}

  // Fetch all stock transfer orders
  getTransfers(): Observable<TransferOrder[]> {
    return this.http.get<TransferOrder[]>(this.apiUrl);
  }

  // Create a new stock transfer order
  createTransfer(transfer: Partial<TransferOrder>): Observable<TransferOrder> {
    return this.http.post<TransferOrder>(this.apiUrl, transfer);
  }
}
