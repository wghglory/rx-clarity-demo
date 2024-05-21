import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { computedAsync } from 'src/app/shared/computed-async';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { UserService } from './../user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [StandaloneModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  id = input.required<number>();

  private userService = inject(UserService);

  user = computedAsync(
    () => {
      // const id = this.id();
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     // reject({ message: 'Wrong', id });
      //     resolve({ name: 'Derek', id });
      //   }, 2000);
      // }).catch(error => error);
      return this.userService.getUser(this.id());
    },
    // { initialValue: null },
    // { requireSync: true },
  );
}
