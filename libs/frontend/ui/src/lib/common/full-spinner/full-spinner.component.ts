import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-full-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-spinner.component.html',
  styleUrls: ['./full-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullSpinnerComponent {
  @HostBinding('class') className = 'full-spinner';
  @Input() isLoading = false;
}
