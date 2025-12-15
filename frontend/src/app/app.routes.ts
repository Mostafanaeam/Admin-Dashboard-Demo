import { Routes } from "@angular/router";
import { OrdersPage } from "./pages/orders.page";
import { PricesPage } from "./pages/prices.page";
import { SizesPage } from "./pages/sizes.page";
import { CustomersPage } from "./pages/customers.page";

export const routes: Routes = [
  { path: "", redirectTo: "orders", pathMatch: "full" },
  { path: "orders", component: OrdersPage },
  { path: "prices", component: PricesPage },
  { path: "sizes", component: SizesPage },
  { path: "customers", component: CustomersPage },
];
