import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export type OrderStatus = "new" | "contacted" | "in_progress" | "completed";

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  items: string[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

@Injectable({ providedIn: "root" })
export class OrdersService {
  private api = "http://localhost:5000";
  orders = signal<Order[]>([]);

  constructor(private http: HttpClient) {}

  loadOrders() {
    this.http
      .get<Order[]>(`${this.api}/orders`)
      .subscribe((data) => this.orders.set(data));
  }

  updateStatus(orderId: number, status: OrderStatus) {
    this.http
      .patch(`${this.api}/orders/${orderId}/status`, { status })
      .subscribe(() => {
        const updated = this.orders().map((o) =>
          o.id === orderId ? { ...o, status } : o
        );
        this.orders.set(updated);
      });
  }
}
