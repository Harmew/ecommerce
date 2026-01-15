import { Component, inject, input, signal } from '@angular/core';

// Store
import { Ecommerce } from '../../../store/ecommerce';

// Pipes
import { TitleCasePipe, CurrencyPipe, DecimalPipe } from '@angular/common';

// Interfaces
import type { Product } from '../../../interfaces/product';

// Component
import { StockStatus } from '../stock-status/stock-status';
import { QuantitySelector } from '../../../components/quantity-selector/quantity-selector';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { StartRating } from '../../../components/start-rating/start-rating';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    CurrencyPipe,
    DecimalPipe,
    StockStatus,
    QuantitySelector,
    MatButtonModule,
    MatIconModule,
    ToggleWishlistButton,
    StartRating,
  ],
  templateUrl: './product-info.html',
})
export class ProductInfo {
  private readonly _store = inject(Ecommerce);
  private readonly _quantity = signal<number>(1);

  public readonly product = input.required<Product>();
  protected readonly quantity = this._quantity.asReadonly();

  protected setItemQuantity(quantity: number) {
    this._quantity.set(quantity);
  }

  addToCart() {
    this._store.addToCart(this.product(), this.quantity());
  }
}
