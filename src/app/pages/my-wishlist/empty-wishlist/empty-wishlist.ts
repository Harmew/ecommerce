import { Component } from '@angular/core';

// Router
import { RouterLink } from '@angular/router';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './empty-wishlist.html',
})
export class EmptyWishlist {}
