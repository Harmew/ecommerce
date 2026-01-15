import { Component, input, output } from '@angular/core';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-selector',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './quantity-selector.html',
})
export class QuantitySelector {
  public readonly quantity = input<number>(0);
  public readonly quantity_updated = output<number>();

  protected decreaseQuantity() {
    if (this.quantity() <= 1) {
      return;
    }

    this.quantity_updated.emit(this.quantity() - 1);
  }

  protected increaseQuantity() {
    this.quantity_updated.emit(this.quantity() + 1);
  }
}
