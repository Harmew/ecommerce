import { Component, input } from '@angular/core';

// Angular Material
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [MatIconModule],
  templateUrl: './stock-status.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class StockStatus {
  public readonly inStock = input.required<boolean>();
}
