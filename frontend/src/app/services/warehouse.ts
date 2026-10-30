import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Warehouse {
  id?: number;
  code: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  managerName: string;
  contactPhone: string;
}

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private apiUrl = 'http://localhost:8080/api/warehouses';

  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrl);
  }

  createWarehouse(warehouse: Warehouse): Observable<any> {
    return this.http.post(this.apiUrl, warehouse, { responseType: 'text' as 'json' });
  }
}
