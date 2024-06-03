import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent, SpinnerComponent } from 'clr-lift';
import { computedAsync } from 'ngx-lift';
import { map } from 'rxjs';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [StandaloneModule, AlertComponent, SpinnerComponent],
  templateUrl: './user-todos.component.html',
  styleUrl: './user-todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTodosComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  id$ = this.route.params.pipe(map(params => params['id']));
  id = toSignal(this.id$);

  todosState = computedAsync(() => this.userService.getTodosState(this.id()), { requireSync: true });
}
