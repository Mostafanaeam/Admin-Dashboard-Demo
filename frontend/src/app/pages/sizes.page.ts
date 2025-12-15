import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SizesService } from "../services/sizes.service";

@Component({
  selector: "app-sizes-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Pizza Sizes</h1>
    <div class="card">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Size Name</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of sizes()">
              <td>{{ s.name }}</td>
            </tr>
            <tr *ngIf="sizes().length === 0">
              <td style="text-align:center; color: var(--text-muted);">
                No sizes available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h3>Add New Size</h3>
      <div style="display: flex; gap: 15px; align-items: flex-end;">
        <div style="flex: 1;">
          <label>Size Name</label>
          <input
            type="text"
            #input
            name="size-name"
            placeholder="e.g. Large, Medium"
          />
        </div>
        <div>
          <button
            (click)="addSize(input.value)"
            class="btn btn-primary"
            style="height: 42px;"
          >
            Add Size
          </button>
        </div>
      </div>
    </div>
  `,
})
export class SizesPage implements OnInit {
  private sizesService = inject(SizesService);

  sizes = this.sizesService.sizes;

  ngOnInit() {
    this.sizesService.loadSizes();
  }
  addSize(name: string) {
    this.sizesService.addSize({ name });
  }
}
