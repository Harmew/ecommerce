import { Component, effect, inject, input, signal } from '@angular/core';

// Router
import { RouterLink } from '@angular/router';

// Pipes
import { TitleCasePipe } from '@angular/common';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Components
import { ProductCard } from '../../components/product-card/product-card';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavModule,
    MatListModule,
    TitleCasePipe,
    RouterLink,
    ToggleWishlistButton,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  private readonly _store = inject(Ecommerce);
  protected readonly category = input<string>('all');

  public readonly _sidenavExpanded = signal<boolean>(true);

  public readonly sidenavExpanded = this._sidenavExpanded.asReadonly();
  protected readonly categories = this._store.categories;
  protected readonly filteredProducts = this._store.filteredProducts;

  constructor() {
    effect(() => {
      this._store.setProductsListSeoTags(this.category());
      this._store.setCategory(this.category());
    });
  }

  protected toggleSidenav() {
    this._sidenavExpanded.update((current) => !current);
  }
}
