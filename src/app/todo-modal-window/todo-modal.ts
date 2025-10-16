import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {OpenModal} from './open-modal/open-modal';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'todo-modal',
  templateUrl: 'todo-modal.html',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todo-modal.css']
})
export class TodoModalWindow {
  readonly dialogRef = inject(MatDialogRef<OpenModal>);
  readonly data = inject(MAT_DIALOG_DATA) as { id: number; description: string };
  readonly description = signal(this.data?.description ?? '');
  readonly maxLength = 120;

  save(): void {
    const value = this.description().trim();
    if (!this.isValid(value)) {
      return;
    }
    this.dialogRef.close({ id: this.data.id, description: value });
  }
  close(): void {
    this.dialogRef.close();
  }

  isValid(value: string = this.description()): boolean {
    return value.length > 0 && value.length <= this.maxLength;
  }
}
