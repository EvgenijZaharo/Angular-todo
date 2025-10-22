import {Component, forwardRef, output, input, OnInit, DestroyRef, inject} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {onChangeFn, onTouchFn} from '../interfaces';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './task-input.html',
  styleUrl: './task-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaskInput),
      multi: true
    },
  ],
  host: {
    '[class.has-error]': 'hasError()'
  }
})
export class TaskInput implements ControlValueAccessor, OnInit {

  private destroyRef = inject(DestroyRef);
  readonly hasValidationError = input<boolean>(false);

  ngOnInit() {
    this.taskControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.onChange(value || ''));
  }

  readonly focusChange = output<boolean>();

  private onChange: onChangeFn<string> = () => {
  };
  private onTouch: onTouchFn = () => {
  };
  taskControl = new FormControl<string>('');

  protected hasError(): boolean {
    return this.hasValidationError();
  }

  writeValue(value: string): void {
    this.taskControl.setValue(value);
  }

  registerOnChange(fn: onChangeFn<string>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: onTouchFn): void {
    this.onTouch = fn;
  }

  onFocus(): void {
    this.focusChange.emit(true);
  }

  onBlur(): void {
    this.onTouch();
    this.focusChange.emit(false);
  }

}

