import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PricesService } from "../services/prices.service";

@Component({
  selector: "app-prices-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Product Prices</h1>
    <div class="card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Current Price</th>
              <th style="width: 250px;">Update Price</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of prices()">
              <td>{{ item.name }}</td>
              <td>\${{ item.price }}</td>
              <td>
                <div style="display: flex; gap: 10px;">
                  <input
                    type="number"
                    name="price-{{ item.id }}"
                    [value]="item.price"
                    #input
                    style="width: 100px;"
                  />
                  <button
                    (click)="updatePrice(item.id, input.value)"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class PricesPage implements OnInit {
  private pricesService = inject(PricesService);

  prices = this.pricesService.prices;

  ngOnInit() {
    this.pricesService.loadPrices();
  }
  updatePrice(id: number, price: string) {
    this.pricesService.updatePrice(id, +price);
  }
}
