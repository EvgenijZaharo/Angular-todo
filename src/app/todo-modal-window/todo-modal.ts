import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {OpenModal} from './open-modal/open-modal';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {VALIDATION_CONSTANTS} from '../app.config';

@Component({
  selector: 'todo-modal',
  templateUrl: 'todo-modal.html',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todo-modal.css']
})
export class TodoModalWindow {
  readonly dialogRef = inject(MatDialogRef<OpenModal>);
  readonly data = inject(MAT_DIALOG_DATA) as { id: number; description: string };

  private _validationConstant = inject(VALIDATION_CONSTANTS);
  private _minLength: number = this._validationConstant.minLength;
  readonly _maxLength: number = this._validationConstant.maxLength;

  readonly descriptionCtrl = new FormControl<string>(this.data?.description ?? '', {
    nonNullable: true,
    validators: [Validators.required,Validators.minLength(this._minLength), Validators.maxLength(this._maxLength)],
  });


  save(): void {
    const raw = this.descriptionCtrl.value ?? '';
    const value = raw.trim();
    if (this.descriptionCtrl.invalid || value.length === 0) {
      this.descriptionCtrl.markAsTouched();
      return;
    }
    this.dialogRef.close({ id: this.data.id, description: value });
  }
  close(): void {
    this.dialogRef.close();
  }
}
