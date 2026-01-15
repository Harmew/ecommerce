import { Component } from '@angular/core';

// Directives
import { ViewPanel } from '../../../directives/view-panel';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './shipping-form.html',
})
export class ShippingForm {}
