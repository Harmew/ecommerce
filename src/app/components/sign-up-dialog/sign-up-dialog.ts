import { Component, inject, signal } from '@angular/core';

// Store
import { Ecommerce } from '../../store/ecommerce';

// Interface
import type { SignUpParams } from '../../interfaces/user';

// Signals Form
import { form, FormField, required, email, validate } from '@angular/forms/signals';

// Components
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

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
type SignUpModel = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Form
const signUpModel = signal<SignUpModel>({
  name: 'Example User!',
  email: 'example@example.com',
  // An strong password for google stop with low security password :)
  password: 'some_pass_3lKxB347!g!6TGhnH5_example',
  confirmPassword: 'some_pass_3lKxB347!g!6TGhnH5_example',
});

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './sign-up-dialog.html',
})
export class SignUpDialog {
  private readonly _store = inject(Ecommerce);
  private readonly _data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<SignUpDialog>);
  private readonly _dialog = inject(MatDialog);
  private readonly _passwordVisible = signal<boolean>(false);
  private readonly _confirmPasswordVisible = signal<boolean>(false);

  protected readonly signUpForm = form(signUpModel, (schema) => {
    required(schema.name, {
      message: 'Name is required',
    });
    required(schema.email, {
      message: 'Email is required',
    });
    email(schema.email, {
      message: 'Invalid email format',
    });
    required(schema.password, {
      message: 'Password is required',
    });
    required(schema.confirmPassword, {
      message: 'Please confirm your password',
    });
    validate(schema.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(schema.password);

      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });

  protected readonly passwordVisible = this._passwordVisible.asReadonly();
  protected readonly confirmPasswordVisible = this._confirmPasswordVisible.asReadonly();
  protected readonly loadingSignUp = signal<boolean>(false);

  protected togglePasswordVisibility(): void {
    this._passwordVisible.update((visible) => !visible);
  }

  protected toggleConfirmPasswordVisibility(): void {
    this._confirmPasswordVisible.update((visible) => !visible);
  }

  protected submitSignUp(event: Event): void {
    event.preventDefault();

    if (!this.signUpForm().valid()) {
      this.signUpForm().markAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm().value();
    this._store.signUp({
      name,
      email,
      password,
      checkout: this._data?.checkout ?? false,
      dialogId: this._dialogRef.id,
    } satisfies SignUpParams);
  }

  protected openSignInDialog(): void {
    this._dialogRef.close();
    this._dialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this._data?.checkout ?? false,
      },
    });
  }
}
