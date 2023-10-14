import { FormControl } from '@angular/forms';

export interface RegisterForm {
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
}
