import { Injectable } from '@angular/core';

// Mocks
import { CATEGORIES_OPTIONS } from '../constants/mocks/categories_options';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {
  private categories = CATEGORIES_OPTIONS;

  getCategories(): string[] {
    return this.categories;
  }
}
