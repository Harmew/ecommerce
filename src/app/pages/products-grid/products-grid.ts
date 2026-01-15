import { Component, effect, inject, input } from '@angular/core';

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

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavModule,
    MatListModule,
    TitleCasePipe,
    RouterLink,
    ToggleWishlistButton,
  ],
  templateUrl: './products-grid.html',
})
export class ProductsGrid {
  private readonly _store = inject(Ecommerce);
  protected readonly category = input<string>('all');

  protected readonly categories = this._store.categories;
  protected readonly filteredProducts = this._store.filteredProducts;

  constructor() {
    effect(() => {
      this._store.setCategory(this.category());
    });
  }
}
