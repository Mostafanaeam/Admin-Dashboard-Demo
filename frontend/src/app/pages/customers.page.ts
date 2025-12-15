import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomersService } from "../services/customers.service";

@Component({
  selector: "app-customers-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Customers</h1>
    <div class="card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of customers()">
              <td>{{ c.name }}</td>
              <td>{{ c.phone }}</td>
            </tr>
            <tr *ngIf="customers().length === 0">
              <td
                colspan="2"
                style="text-align:center; color: var(--text-muted);"
              >
                No customers found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h3>Add New Customer</h3>
      <div style="display: flex; gap: 15px; align-items: flex-end;">
        <div style="flex: 1;">
          <label>Name</label>
          <input
            type="text"
            #name
            name="customer-name"
            placeholder="Enter name"
          />
        </div>
        <div style="flex: 1;">
          <label>Phone</label>
          <input
            type="text"
            #phone
            name="customer-phone"
            placeholder="Enter phone"
          />
        </div>
        <div>
          <button
            (click)="addCustomer(name.value, phone.value)"
            class="btn btn-primary"
            style="height: 42px;"
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CustomersPage implements OnInit {
  private customersService = inject(CustomersService);

  customers = this.customersService.customers;

  ngOnInit() {
    this.customersService.loadCustomers();
  }
  addCustomer(name: string, phone: string) {
    this.customersService.addCustomer({ name, phone });
  }
}
