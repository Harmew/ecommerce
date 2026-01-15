import { Component, computed, inject, input } from '@angular/core';

// Store
import { Ecommerce } from '../../../store/ecommerce';

// Directives
import { ViewPanel } from '../../../directives/view-panel';

// Interfaces
import type { Product } from '../../../interfaces/product';

// Components
import { RatingSummary } from './rating-summary/rating-summary';
import { ViewReviewItem } from './view-review-item/view-review-item';
import { WriteReview } from './write-review/write-review';

// Angular Material
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButtonModule, WriteReview],
  templateUrl: './view-reviews.html',
})
export class ViewReviews {
  private readonly _store = inject(Ecommerce);

  public readonly product = input.required<Product>();

  protected readonly writeReview = this._store.writeReview;
  protected readonly user = this._store.user;

  protected readonly sortedReviews = computed(() => {
    return [...this.product().reviews].sort(
      (a, b) => b.reviewDate.getTime() - a.reviewDate.getTime(),
    );
  });

  protected showWriteReview(): void {
    this._store.showWriteReview();
  }

  protected hideWriteReview(): void {
    this._store.hideWriteReview();
  }
}
