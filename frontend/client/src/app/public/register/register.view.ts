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
import { RegisterForm } from './interfaces';
import { AuthFacade } from '@frontend/services';
import {
  ButtonComponent,
  FormComponent,
  FormFieldComponent,
  InputComponent,
  RowComponent,
} from '@frontend/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.view.html',
  styleUrls: ['./register.view.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterView implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authFacade: AuthFacade = inject(AuthFacade);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  readonly form: FormGroup<RegisterForm> = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.authFacade.loginPasswordSuccess$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // REDIRECT
        },
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { firstName, lastName, email, password } = this.form.value;
      this.authFacade.createUser({ firstName, lastName, email, password });
    }
  }
}
