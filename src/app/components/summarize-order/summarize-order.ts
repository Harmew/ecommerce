import { Component, inject, computed } from '@angular/core';

// Pipes
import { CurrencyPipe, PercentPipe } from '@angular/common';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Directives
import { ViewPanel } from '../../directives/view-panel';

// Constants
import { TAX_RATE } from '../../constants/mocks/tax';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe, PercentPipe],
  templateUrl: './summarize-order.html',
})
export class SummarizeOrder {
  private readonly _store = inject(Ecommerce);

  protected readonly tax_percent = computed(() => TAX_RATE);
  protected readonly tax = computed(() => this.subtotal() * TAX_RATE);
  protected readonly total = computed(() => this.subtotal() + this.tax());
  protected readonly subtotal = computed(() =>
    this._store.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );
}
