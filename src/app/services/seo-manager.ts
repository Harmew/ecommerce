import { inject, Injectable } from '@angular/core';

// Angular Router
import { Router } from '@angular/router';

// Angular Platform Browser
import { Meta, Title } from '@angular/platform-browser';

// Interfaces
import type { SeoData } from '../interfaces/seo-data';

@Injectable({
  providedIn: 'root',
})
export class SeoManager {
  private readonly _title = inject(Title);
  private readonly _meta = inject(Meta);
  private readonly _router = inject(Router);
  private readonly _request = inject(Request, { optional: true });
  private readonly _document = inject(Document, { optional: true });

  private readonly siteName = 'Modern Store';
  private readonly defaultImage =
    'https://dummyimage.com/600x400/ffffff/030003.png&text=Modern+Store';

  updateSeoTags(seoData: SeoData) {
    const fullUrl = this.buildFullUrl();
    const imageUrl = seoData.image || this.defaultImage;

    this.updateTitleAndDescription(seoData);
    this.updateCanonical(fullUrl);
    this.updateOpenGraph(seoData, fullUrl, imageUrl);
  }

  private updateTitleAndDescription(seoData: SeoData): void {
    this._title.setTitle(`${seoData.title} | ${this.siteName}`);
    this._meta.updateTag({ name: 'description', content: seoData.description });
  }

  private buildFullUrl(): string {
    const origin = this.resolveOrigin();
    return `${origin}${this._router.url}`;
  }

  private resolveOrigin(): string {
    if (this._request) {
      const headers = this._request.headers satisfies Headers | undefined;

      const protocol =
        (headers?.get('x-forwarded-proto') || this._request.url.split(':')[0] || 'https') + '://';

      const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';

      return host ? `${protocol}${host}` : '';
    }

    if (typeof window !== 'undefined') {
      return window.location.origin;
    }

    return '';
  }

  private updateCanonical(url: string): void {
    if (!this._document) return;

    let canonicalLink = this._document.querySelector(
      'link[rel="canonical"]',
    ) satisfies HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = this._document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this._document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', url);
  }

  private updateOpenGraph(seoData: SeoData, fullUrl: string, imageUrl: string): void {
    this._meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this._meta.updateTag({ property: 'og:title', content: seoData.title });
    this._meta.updateTag({ property: 'og:description', content: seoData.description });
    this._meta.updateTag({ property: 'og:url', content: fullUrl });
    this._meta.updateTag({ property: 'og:image', content: imageUrl });
    this._meta.updateTag({ name: 'og:image:width', content: '1200' });
    this._meta.updateTag({ name: 'og:image:height', content: '630' });
    this._meta.updateTag({ name: 'og:locale', content: 'en_US' });
  }
}
