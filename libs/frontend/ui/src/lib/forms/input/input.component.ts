import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: false }) placeholder = '';
  @Input({ required: false }) label = '';
  @Input({ required: false }) type = 'text';
  @Input({ required: false }) showErrors = false;
  @Input({ required: false }) showSuccess = false;
  @HostBinding('class') className = 'input';
  value = '';
  id = uuidv4();

  // Métodos del ControlValueAccessor
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  // Método para propagar cambios
  onInputChange() {
    this.onChange(this.value);
  }
}
