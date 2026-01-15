import { Component, computed, effect, inject, input } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Components
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { ViewReviews } from './view-reviews/view-reviews';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReviews],
  templateUrl: './view-product-detail.html',
})
export class ViewProductDetail {
  private readonly _store = inject(Ecommerce);

  public readonly productId = input.required<string>();

  protected readonly selectedProduct = this._store.selectedProduct;
  protected readonly backRoute = computed(() => `/products/${this._store.category()}`);

  constructor() {
    effect(() => {
      this._store.setProductId(this.productId());
    });
  }
}
