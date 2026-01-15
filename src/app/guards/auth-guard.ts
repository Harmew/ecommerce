import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// Store
import { Ecommerce } from '../store/ecommerce';

export const authGuard: CanActivateFn = () => {
  const store = inject(Ecommerce);
  const router = inject(Router);

  const user = store.user();

  if (!user) {
    return router.createUrlTree(['/products/all']);
  }

  return true;
};
