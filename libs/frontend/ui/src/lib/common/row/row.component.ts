import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  WritableSignal,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @HostBinding('class') className = 'row grid grid-cols-1';

  @Input({ required: false }) set columns(value: number) {
    this._columns.set(value);
  }

  private readonly _columns: WritableSignal<number> = signal(1);
  constructor() {
    effect(() => {
      this.setGridColumn();
    });
  }

  private setGridColumn(): void {
    this.className = `row grid grid-cols-${this._columns()}`;
  }
}
