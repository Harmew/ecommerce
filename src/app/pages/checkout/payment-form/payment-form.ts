import { Component } from '@angular/core';

// Directives
import { ViewPanel } from '../../../directives/view-panel';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIconModule, MatRadioModule],
  templateUrl: './payment-form.html',
})
export class PaymentForm {}
