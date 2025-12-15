import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <nav class="sidebar">
        <div class="sidebar-header">Admin Panel</div>
        <ul class="nav-links">
          <li>
            <a routerLink="/orders" routerLinkActive="active-link">Orders</a>
          </li>
          <li>
            <a routerLink="/prices" routerLinkActive="active-link">Prices</a>
          </li>
          <li>
            <a routerLink="/sizes" routerLinkActive="active-link">Sizes</a>
          </li>
          <li>
            <a routerLink="/customers" routerLinkActive="active-link"
              >Customers</a
            >
          </li>
        </ul>
      </nav>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
