import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface PriceItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: "root" })
export class PricesService {
  private api = "http://localhost:5000";
  prices = signal<PriceItem[]>([]);

  constructor(private http: HttpClient) {}
  loadPrices() {
    this.http
      .get<PriceItem[]>(`${this.api}/prices`)
      .subscribe((data) => this.prices.set(data));
  }
  updatePrice(id: number, price: number) {
    this.http.patch(`${this.api}/prices/${id}`, { price }).subscribe(() => {
      const updated = this.prices().map((p) =>
        p.id === id ? { ...p, price } : p
      );
      this.prices.set(updated);
    });
  }
}
