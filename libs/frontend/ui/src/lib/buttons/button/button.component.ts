import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() loading = false;
  @Input() disabled = false;
  @Input({ required: false }) severity: ButtonSeverity = 'primary';

  @HostBinding('class') className = 'button';
}
