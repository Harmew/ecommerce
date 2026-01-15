import { inject, Injectable } from '@angular/core';

// Hot Toast
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  private readonly _toaster = inject(HotToastService);

  public success(message: string): void {
    this._toaster.success(message);
  }

  public error(message: string): void {
    this._toaster.error(message);
  }

  public show(message: string): void {
    this._toaster.show(message);
  }
}
