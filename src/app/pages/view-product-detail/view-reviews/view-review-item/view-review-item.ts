import { Component, input } from '@angular/core';

// Pipes
import { DatePipe } from '@angular/common';

// Directives
import { ViewPanel } from '../../../../directives/view-panel';

// Interfaces
import type { UserReview } from '../../../../interfaces/user-review';

// Components
import { StartRating } from '../../../../components/start-rating/start-rating';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, StartRating, DatePipe],
  templateUrl: './view-review-item.html',
})
export class ViewReviewItem {
  public readonly review = input.required<UserReview>();
}
