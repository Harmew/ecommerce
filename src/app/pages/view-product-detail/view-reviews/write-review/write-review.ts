import { Component, signal, inject } from '@angular/core';

// Store
import { Ecommerce } from '../../../../store/ecommerce';

// Directives
import { ViewPanel } from '../../../../directives/view-panel';

// Interface
import { OptionItem } from '../../../../interfaces/option-item';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Signals Form
import { form, FormField, required } from '@angular/forms/signals';

// Local Type
type ReviewFormModel = {
  title: string;
  comment: string;
  rating: number;
};

// Form
const reviewFormModel = signal<ReviewFormModel>({
  title: 'Great Product!',
  comment: 'I really enjoyed using this product. It exceeded my expectations!',
  rating: 5,
});

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './write-review.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class WriteReview {
  private readonly _store = inject(Ecommerce);

  protected readonly loadingWriteReview = this._store.loadingWriteReview;
  protected readonly ratingOptions = signal<OptionItem[]>([
    { label: '5 Stars - Excellent', value: 5 },
    { label: '4 Stars - Very Good', value: 4 },
    { label: '3 Stars - Good', value: 3 },
    { label: '2 Stars - Fair', value: 2 },
    { label: '1 Star - Poor', value: 1 },
  ]);

  protected hideWriteReview(): void {
    this._store.hideWriteReview();
  }

  protected readonly reviewForm = form(reviewFormModel, (schema) => {
    required(schema.title, {
      message: 'Title is required',
    });
    required(schema.comment, {
      message: 'Comment is required',
    });
    required(schema.rating, {
      message: 'Rating is required',
    });
  });

  public saveReview(event: Event): void {
    event.preventDefault();

    if (!this.reviewForm().valid()) {
      this.reviewForm().markAsTouched();
      return;
    }

    const { title, comment, rating } = this.reviewForm().value();
    this._store.addReview({ title, comment, rating });
  }
}
