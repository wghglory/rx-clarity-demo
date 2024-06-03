import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertComponent, SpinnerComponent } from 'clr-lift';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [StandaloneModule, RouterModule, AlertComponent, SpinnerComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private userService = inject(UserService);

  usersState = this.userService.usersState;
}
