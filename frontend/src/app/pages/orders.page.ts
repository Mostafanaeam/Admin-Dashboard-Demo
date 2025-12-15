import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrdersService, OrderStatus } from "../services/orders.service";

@Component({
  selector: "app-orders-page",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Orders Management</h1>
    <div class="card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders()">
              <td>{{ order.customerName }}</td>
              <td>{{ order.customerPhone }}</td>
              <td>\${{ order.totalPrice }}</td>
              <td>
                <select
                  name="status-{{ order.id }}"
                  [ngModel]="order.status"
                  (ngModelChange)="changeStatus(order.id, $event)"
                  style="min-width: 130px;"
                >
                  <option *ngFor="let s of statuses" [ngValue]="s">
                    {{ s }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class OrdersPage implements OnInit {
  private ordersService = inject(OrdersService);

  orders = this.ordersService.orders;
  statuses: OrderStatus[] = ["new", "contacted", "in_progress", "completed"];

  ngOnInit() {
    this.ordersService.loadOrders();
  }
  changeStatus(id: number, status: OrderStatus) {
    this.ordersService.updateStatus(id, status);
  }
}
