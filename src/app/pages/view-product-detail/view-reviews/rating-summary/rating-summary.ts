import { Component, input } from '@angular/core';

// Angular Material
import { MatIconModule } from '@angular/material/icon';

// Interfaces
import type { Product } from '../../../../interfaces/product';

// Components
import { StartRating } from '../../../../components/start-rating/start-rating';

@Component({
  selector: 'app-rating-summary',
  imports: [StartRating, MatIconModule],
  templateUrl: './rating-summary.html',
})
export class RatingSummary {
  public readonly product = input.required<Product>();

  protected readonly totalReviews = () => {
    return this.product().reviews.length;
  };

  protected readonly ratingBreakdown = () => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0) return [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, percentage: 0 }));
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((review) => review.rating === stars).length;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return { stars, count, percentage };
    });
  };
}
