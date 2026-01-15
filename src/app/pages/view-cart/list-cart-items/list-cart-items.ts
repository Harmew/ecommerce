import { Component, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../../store/ecommerce';

// Directives
import { ViewPanel } from '../../../directives/view-panel';

// Components
import { ShowCartItem } from '../../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItem],
  templateUrl: './list-cart-items.html',
})
export class ListCartItems {
  private readonly _store = inject(Ecommerce);

  protected readonly cartItemsCount = this._store.cartItemsCount;
  protected readonly cartItems = this._store.cartItems;
}
