import { Component, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Angular Material
import { MatButtonModule } from '@angular/material/button';

// Components
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { TeaseWishlist } from './tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, MatButtonModule],
  templateUrl: './view-cart.html',
})
export class ViewCart {
  private readonly _store = inject(Ecommerce);

  protected readonly cartItems = this._store.cartItems;

  protected proceedToCheckout(): void {
    this._store.proceedToCheckout();
  }
}
