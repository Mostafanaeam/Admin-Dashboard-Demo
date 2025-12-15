import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Size {
  id: number;
  name: string;
}

@Injectable({ providedIn: "root" })
export class SizesService {
  private api = "http://localhost:5000";
  sizes = signal<Size[]>([]);

  constructor(private http: HttpClient) {}
  loadSizes() {
    this.http
      .get<Size[]>(`${this.api}/sizes`)
      .subscribe((data) => this.sizes.set(data));
  }
  addSize(size: { name: string }) {
    this.http.post(`${this.api}/sizes`, size).subscribe((newSize) => {
      // Using set to create a new array ref similar to mutate/push pattern
      this.sizes.update((arr) => [...arr, newSize as Size]);
    });
  }
}
