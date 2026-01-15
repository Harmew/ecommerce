import { Component, computed, inject, input } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Interfaces
import type { Product } from '../../interfaces/product';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-wishlist-button.html',
})
export class ToggleWishlistButton {
  private readonly _store = inject(Ecommerce);

  public readonly product = input.required<Product>();

  protected readonly isInWishlist = computed(() =>
    this._store.wishlistItems().some((item) => item.id === this.product().id),
  );

  protected toggleWishlist(): void {
    if (this.isInWishlist()) {
      this._store.removeFromWishlist(this.product());
      return;
    }

    this._store.addToWishlist(this.product());
  }
}
