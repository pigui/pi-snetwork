import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '@frontend/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView {
  readonly authFacade: AuthFacade = inject(AuthFacade);
}
