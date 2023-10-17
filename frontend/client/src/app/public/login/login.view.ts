import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm } from './interfaces';
import {
  ButtonComponent,
  FormComponent,
  FormFieldComponent,
  InputComponent,
  RowComponent,
} from '@frontend/ui';
import { AuthFacade } from '@frontend/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    FormComponent,
    ButtonComponent,
    RowComponent,
    FormFieldComponent,
  ],
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginView implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authFacade: AuthFacade = inject(AuthFacade);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  readonly form: FormGroup<LoginForm> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.authFacade.loginPasswordSuccess$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // REDIRECT
          this.router.navigate(['home']);
        },
      });
  }

  goRegister(): void {
    this.router.navigate(['register']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authFacade.loginWithPassword({
        email,
        password,
      });
    }
  }
}
