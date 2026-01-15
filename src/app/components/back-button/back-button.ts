import { Component, input } from '@angular/core';

// Router
import { RouterLink } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './back-button.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BackButton {
  public readonly label = input<string>('Back');
  public readonly navigateTo = input<string | null>(null);
}
