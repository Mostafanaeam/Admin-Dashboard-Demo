import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Customer {
  id: number;
  name: string;
  phone: string;
}

@Injectable({ providedIn: "root" })
export class CustomersService {
  private api = "http://localhost:5000";
  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) {}
  loadCustomers() {
    this.http
      .get<Customer[]>(`${this.api}/customers`)
      .subscribe((data) => this.customers.set(data));
  }
  addCustomer(customer: { name: string; phone: string }) {
    this.http.post(`${this.api}/customers`, customer).subscribe((c) => {
      this.customers.update((arr) => [...arr, c as Customer]);
    });
  }
}
