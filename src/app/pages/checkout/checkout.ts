import { Component, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Pipes
import { CurrencyPipe } from '@angular/common';

// Angular Material
import { MatButtonModule } from '@angular/material/button';

// Components
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentForm } from './payment-form/payment-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummarizeOrder, CurrencyPipe, MatButtonModule],
  templateUrl: './checkout.html',
})
export class Checkout {
  private readonly _store = inject(Ecommerce);

  protected readonly cartItems = this._store.cartItems;
  protected readonly loadingCheckout = this._store.loadingCheckout;

  protected placeOrder(): void {
    this._store.placeOrder();
  }
}
