import { Component, inject } from '@angular/core';

// Interfaces
import type { Product } from '../../interfaces/product';

// Components
import { BackButton } from '../../components/back-button/back-button';
import { ProductCard } from '../../components/product-card/product-card';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Store
import { Ecommerce } from '../../store/ecommerce';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, EmptyWishlist, MatButtonModule, MatIconModule],
  templateUrl: './my-wishlist.html',
})
export class MyWishlist {
  private readonly _store = inject(Ecommerce);

  protected readonly wishlistItemsCount = this._store.wishlistItemsCount;
  protected readonly wishlistItems = this._store.wishlistItems;

  protected removeFromWishlist(product: Product): void {
    this._store.removeFromWishlist(product);
  }

  protected clearWishlist(): void {
    this._store.clearWishlist();
  }
}
