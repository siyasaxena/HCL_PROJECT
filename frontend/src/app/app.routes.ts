import { Routes } from '@angular/router';

import { ProductsComponent } from './components/product-list/product-list';
import { SignupComponent } from './components/signup/signup';
import { InventoryComponent } from './components/inventory/inventory';
import { SalesOrderComponent } from './components/sales-orders/sales-orders';
import { TransferOrderComponent } from './components/transfers/transfers';
import { ProcurementComponent } from './components/procurement/procurement';
import { WarehousesComponent } from './components/warehouses/warehouses';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'orders', component: SalesOrderComponent },
  { path: 'transfers', component: TransferOrderComponent },
  { path: 'procurement', component: ProcurementComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'signup' },
];
