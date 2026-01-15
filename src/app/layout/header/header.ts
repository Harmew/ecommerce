import { Component } from '@angular/core';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';

// Components
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions],
  templateUrl: './header.html',
})
export class Header {}
