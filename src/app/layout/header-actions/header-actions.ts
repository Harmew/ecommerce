import { Component, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Angular Router
import { RouterLink } from '@angular/router';

// Components
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './header-actions.html',
})
export class HeaderActions {
  private readonly _store = inject(Ecommerce);
  private readonly _dialog = inject(MatDialog);

  protected readonly wishlistItemsCount = this._store.wishlistItemsCount;
  protected readonly cartItemsCount = this._store.cartItemsCount;
  protected readonly user = this._store.user;

  protected signOut() {
    this._store.signOut();
  }

  protected openSignUpDialog(): void {
    this._dialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: false,
      },
    });
  }

  protected openSignInDialog(): void {
    this._dialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: false,
      },
    });
  }
}
