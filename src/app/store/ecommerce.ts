import { Injectable, signal, computed, inject } from '@angular/core';

// Router
import { Router } from '@angular/router';

// Angular Material
import { MatDialog } from '@angular/material/dialog';

// Services
import { Toaster } from '../services/toaster';
import { SeoManager } from '../services/seo-manager';

// Helpers
import { withLocalStorage } from '../helpers/withLocalStorage';

// Interfaces
import type { Product } from '../interfaces/product';
import type { CartItem } from '../interfaces/cart';
import type { Order } from '../interfaces/order';
import type { User, SignInParams, SignUpParams } from '../interfaces/user';
import type { AddReviewParams } from '../interfaces/user-review';

// Mocks
import { MOCK_PRODUCTS } from '../constants/mocks/products';
import { MOCK_USER } from '../constants/mocks/user';
import { CATEGORIES_OPTIONS } from '../constants/mocks/categories_options';

// Components
import { SignInDialog } from '../components/sign-in-dialog/sign-in-dialog';

@Injectable({
  providedIn: 'root',
})
export class Ecommerce {
  private readonly _toaster = inject(Toaster);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);
  private readonly _seoManager = inject(SeoManager);

  // Initial State
  private readonly _products = signal<Product[]>(MOCK_PRODUCTS);
  private readonly _selectedProductId = signal<string | null>(null);
  private readonly _categories = signal<string[]>(CATEGORIES_OPTIONS);
  private readonly _wishlistItems = withLocalStorage<Product[]>('wishlist:items', []);
  private readonly _category = signal<string>('all');
  private readonly _cartItems = withLocalStorage<CartItem[]>('cart:items', []);
  private readonly _user = withLocalStorage<User | null>('auth:user', null);
  private readonly _loadingCheckout = signal<boolean>(false);
  private readonly _writeReview = signal<boolean>(false);
  private readonly _loadingWriteReview = signal<boolean>(false);

  // Readonly Signals
  public readonly products = this._products.asReadonly();
  public readonly selectedProductId = this._selectedProductId.asReadonly();
  public readonly categories = this._categories.asReadonly();
  public readonly category = this._category.asReadonly();
  public readonly wishlistItems = this._wishlistItems.asReadonly();
  public readonly cartItems = this._cartItems.asReadonly();
  public readonly user = this._user.asReadonly();
  public readonly loadingCheckout = this._loadingCheckout.asReadonly();
  public readonly writeReview = this._writeReview.asReadonly();
  public readonly loadingWriteReview = this._loadingWriteReview.asReadonly();

  // Computed Signals
  public readonly wishlistItemsCount = computed(() => this.wishlistItems().length);
  public readonly cartItemsCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );
  public readonly filteredProducts = computed(() => {
    if (this.category().toLowerCase() === 'all') {
      return this.products();
    }

    return this.products().filter(
      (product) => product.category.toLowerCase() === this.category().toLowerCase(),
    );
  });
  public readonly selectedProduct = computed(() => {
    const productId = this.selectedProductId();
    return this.products().find((product) => product.id === productId) || null;
  });

  // Actions
  public setCategory(category: string): void {
    this._category.set(category);
  }

  public setProductId(productId: string | null): void {
    this._selectedProductId.set(productId);
  }

  public addToWishlist(product: Product): void {
    this._wishlistItems.update((wishlist) => [...wishlist, product]);
    this._toaster.show('Product added to wishlist!');
  }

  public removeFromWishlist(product: Product): void {
    this._wishlistItems.update((wishlist) => wishlist.filter((item) => item.id !== product.id));
    this._toaster.show('Product removed from wishlist!');
  }

  public clearWishlist(): void {
    this._wishlistItems.set([]);
  }

  public addAllWishlistToCart(): void {
    this.wishlistItems().forEach((product) => this.addToCart(product, 1, false));
    this.clearWishlist();
    this._toaster.show('All wishlist items added to cart!');
  }

  public moveToWishlist(productId: string): void {
    const itemIndex = this._cartItems().findIndex((item) => item.product.id === productId);
    if (itemIndex !== -1) {
      const [item] = this._cartItems().splice(itemIndex, 1);
      this._cartItems.set(this._cartItems());
      this._wishlistItems.update((wishlist) => [...wishlist, item.product]);
      this._toaster.show('Product moved to wishlist!');
    }
  }

  public addToCart(product: Product, quantity: number = 1, show: boolean = true): void {
    const existingCartItem = this._cartItems().find((item) => item.product.id === product.id);
    if (existingCartItem) {
      this._cartItems.update((cart) =>
        cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      );
    } else {
      this._cartItems.update((cart) => [...cart, { product, quantity }]);
    }

    if (show) {
      this._toaster.show('Product added to cart!');
    }
  }

  public setItemQuantity(productId: string, quantity: number): void {
    this._cartItems.update((cart) =>
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }

  public removeFromCart(productId: string): void {
    this._cartItems.update((cart) => cart.filter((item) => item.product.id !== productId));
    this._toaster.show('Product removed from cart!');
  }

  public proceedToCheckout(): void {
    if (!this.user()) {
      this._dialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: true,
        },
      });
      return;
    }

    this._router.navigate(['/checkout']);
  }

  public signIn({ checkout, dialogId, ..._ }: SignInParams): void {
    // Simulate sign-in process
    const mockUser = MOCK_USER satisfies User;
    this._user.set(mockUser);

    const dialogRef = this._dialog.getDialogById(dialogId);
    dialogRef?.close();

    if (checkout) {
      this._router.navigate(['/checkout']);
    }
  }

  public signUp({ checkout, dialogId, ..._ }: SignUpParams): void {
    // Simulate sign-up process
    const mockUser = MOCK_USER satisfies User;
    this._user.set(mockUser);

    const dialogRef = this._dialog.getDialogById(dialogId);
    dialogRef?.close();

    if (checkout) {
      this._router.navigate(['/checkout']);
    }
  }

  public signOut(): void {
    this._user.set(null);
    this._cartItems.set([]);
    this._wishlistItems.set([]);

    localStorage.removeItem('auth:user');
    localStorage.removeItem('cart:items');
    localStorage.removeItem('wishlist:items');

    this._router.navigate(['/products/all']);
  }

  public async placeOrder(): Promise<void> {
    this._loadingCheckout.set(true);

    const user = this.user();

    if (!user) {
      this._toaster.error('You must be signed in to place an order.');
      this._loadingCheckout.set(false);
      return;
    }

    const order: Order = {
      id: Math.random().toString(36).substring(2, 15),
      userId: user.id,
      total: Math.round(
        this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
      ),
      items: this.cartItems(),
      paymentStatus: 'success',
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));
    this._cartItems.set([]);
    this._loadingCheckout.set(false);
    this._router.navigate(['/order-success']);
  }

  public showWriteReview(): void {
    this._writeReview.set(true);
  }

  public hideWriteReview(): void {
    this._writeReview.set(false);
  }

  public async addReview(review: AddReviewParams) {
    this._loadingWriteReview.set(true);

    const product = this.selectedProduct();
    const user = this.user();

    if (product && user) {
      const newReview = {
        id: Math.random().toString(36).substring(2, 15),
        productId: product.id,
        userName: user.name,
        userImageUrl: user.imageUrl,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        reviewDate: new Date(),
      };

      this._products.update((products) =>
        products.map((p) =>
          p.id === product.id ? { ...p, reviews: [...p.reviews, newReview] } : p,
        ),
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this._loadingWriteReview.set(false);
    this._writeReview.set(false);
    this._toaster.show('Review added successfully!');
  }

  public setProductsListSeoTags(category: string) {
    const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All';
    const description = category
      ? `Browse our selection of ${categoryName} products.`
      : 'Browse our selection of products.';
    this._seoManager.updateSeoTags({
      title: categoryName,
      description,
    });
  }

  public setProductSeoTags(product: Product | null) {
    if (!product) return;
    this._seoManager.updateSeoTags({
      title: product.name,
      description: product.description,
      image: product.imageUrl,
      type: 'product',
    });
  }
}
