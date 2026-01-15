import { Component } from '@angular/core';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Router
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './order-success.html',
})
export class OrderSuccess {}
