import { Routes } from '@angular/router';

// Guards
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid').then((m) => m.ProductsGrid),
  },
  {
    path: 'product/:productId',
    loadComponent: () =>
      import('./pages/view-product-detail/view-product-detail').then((m) => m.ViewProductDetail),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist').then((m) => m.MyWishlist),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart').then((m) => m.ViewCart),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
    canActivate: [authGuard],
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success').then((m) => m.OrderSuccess),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
];
