import { Component, inject, signal } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Interface
import type { SignInParams } from '../../interfaces/user';

// Signals Form
import { form, FormField, required, email } from '@angular/forms/signals';

// Components
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

// Local Type
type SignInModel = {
  email: string;
  password: string;
};

// Form
const signInModel = signal<SignInModel>({
  email: 'example@example.com',
  // An strong password for google stop with low security password :)
  password: 'some_pass_3lKxB347!g!6TGhnH5_example',
});

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './sign-in-dialog.html',
})
export class SignInDialog {
  private readonly _store = inject(Ecommerce);
  private readonly _data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<SignInDialog>);
  private readonly _dialog = inject(MatDialog);
  private readonly _passwordVisible = signal<boolean>(false);

  protected readonly signInForm = form(signInModel, (schema) => {
    required(schema.email, {
      message: 'Email is required',
    });
    email(schema.email, {
      message: 'Invalid email format',
    });
    required(schema.password, {
      message: 'Password is required',
    });
  });

  protected readonly passwordVisible = this._passwordVisible.asReadonly();

  protected togglePasswordVisibility(): void {
    this._passwordVisible.update((visible) => !visible);
  }

  protected submitSignIn(event: Event): void {
    event.preventDefault();

    if (!this.signInForm().valid()) {
      this.signInForm().markAsTouched();
      return;
    }

    const { email, password } = this.signInForm().value();
    this._store.signIn({
      email,
      password,
      checkout: this._data?.checkout ?? false,
      dialogId: this._dialogRef.id,
    } satisfies SignInParams);
  }

  protected openSignUpDialog(): void {
    this._dialogRef.close();
    this._dialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this._data?.checkout ?? false,
      },
    });
  }
}
