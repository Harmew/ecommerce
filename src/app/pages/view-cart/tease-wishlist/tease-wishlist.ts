import { Component, inject } from '@angular/core';

// Router
import { RouterLink } from '@angular/router';

// Store
import { Ecommerce } from '../../../store/ecommerce';

// Directives
import { ViewPanel } from '../../../directives/view-panel';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tease-wishlist.html',
})
export class TeaseWishlist {
  private readonly _store = inject(Ecommerce);

  protected readonly wishlistItemsCount = this._store.wishlistItemsCount;

  protected addAllWishlistToCart() {
    this._store.addAllWishlistToCart();
  }
}
