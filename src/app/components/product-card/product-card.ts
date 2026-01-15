import { Component, inject, input } from '@angular/core';

// Router
import { RouterLink } from '@angular/router';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Pipes
import { CurrencyPipe } from '@angular/common';

// Components
import { StartRating } from '../start-rating/start-rating';

// Interfaces
import type { Product } from '../../interfaces/product';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, RouterLink, StartRating],
  templateUrl: './product-card.html',
})
export class ProductCard {
  private readonly _store = inject(Ecommerce);

  public readonly product = input.required<Product>();

  protected addToCart(): void {
    this._store.addToCart(this.product());
  }
}
