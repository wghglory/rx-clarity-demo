import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [ClarityModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type = 'danger';
  @Input() isSmall = false;
  @Input() error = { message: '' } as HttpErrorResponse;
}
