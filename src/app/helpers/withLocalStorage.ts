import { signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function withLocalStorage<T>(key: string, initialValue: T) {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  const state = signal<T>(initialValue);

  if (isBrowser) {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        state.set(JSON.parse(stored));
      }
    } catch {}
  }

  effect(() => {
    if (!isBrowser) return;

    try {
      localStorage.setItem(key, JSON.stringify(state()));
    } catch {}
  });

  return state;
}
