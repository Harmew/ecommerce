import { Component, computed, input, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Pipes
import { CurrencyPipe } from '@angular/common';

// Interfaces
import type { CartItem } from '../../interfaces/cart';

// Components
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';

@Component({
  selector: 'app-show-cart-item',
  imports: [CurrencyPipe, QuantitySelector, MatButtonModule, MatIconModule],
  templateUrl: './show-cart-item.html',
})
export class ShowCartItem {
  private readonly _store = inject(Ecommerce);
  public readonly item = input.required<CartItem>();

  protected readonly total = computed(() => {
    return this.item().product.price * this.item().quantity;
  });

  protected setItemQuantity(quantity: number) {
    this._store.setItemQuantity(this.item().product.id, quantity);
  }

  protected moveToWishlist() {
    this._store.moveToWishlist(this.item().product.id);
  }

  protected removeFromCart() {
    this._store.removeFromCart(this.item().product.id);
  }
}
