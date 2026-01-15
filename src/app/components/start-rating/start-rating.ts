import { Component, computed, input } from '@angular/core';

// Angular Material
import { MatIconModule } from '@angular/material/icon';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-start-rating',
  imports: [MatIconModule],
  templateUrl: './start-rating.html',
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class StartRating {
  public readonly rating = input.required<number>();

  protected readonly stars = computed<StarType[]>(() => {
    const rating = this.rating();

    return Array.from({ length: 5 }, (_, index) => {
      const diff = rating - index;

      if (diff >= 1) return 'full';
      if (diff >= 0.5) return 'half';
      return 'empty';
    });
  });
}
