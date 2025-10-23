import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import {TodoModalWindow} from '../todo-modal';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'open-modal',
  styleUrl: 'open-modal.css',
  templateUrl: 'open-modal.html',
  imports: [MatButtonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenModal {
  readonly dialog = inject(MatDialog);
  readonly id = input.required<number>();
  readonly task = input.required<string>();
  readonly save = output<{ id: number; task: string }>();

  openDialog(): void {
    const ref = this.dialog.open(TodoModalWindow, {
      width: '420px',
      panelClass: 'tw-modal-panel',
      backdropClass: 'tw-modal-backdrop',
      data: { id: this.id(), task: this.task() },
    });
    ref.afterClosed().subscribe(result => {
      if (result && typeof result.id === 'number' && typeof result.task === 'string') {
        this.save.emit(result);
      }
    });
  }
}
