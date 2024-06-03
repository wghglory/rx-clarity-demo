import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { StandaloneModule } from '../shared/standalone.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserTodosComponent } from './user-todos/user-todos.component';

@Component({
  selector: 'app-computed-async-demo',
  standalone: true,
  imports: [UserListComponent, UserTodosComponent, UserDetailComponent, StandaloneModule, RouterOutlet, FormsModule],
  templateUrl: './computed-async-demo.component.html',
  styleUrl: './computed-async-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComputedAsyncDemoComponent {
  userIds = signal([1, 2, 3, 4]);
  selectedUserId = model<number>(NaN);
}
