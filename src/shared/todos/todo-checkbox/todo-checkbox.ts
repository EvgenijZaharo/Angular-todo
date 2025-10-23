import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {onChangeFn, onTouchFn} from '../../../interfaces/interfaces';

@Component({
  selector: 'todo-checkbox',
  imports: [],
  templateUrl: './todo-checkbox.html',
  styleUrl: './todo-checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoCheckbox),
      multi: true
    }
  ]
})
export class TodoCheckbox implements ControlValueAccessor {

  checked = signal(false);
  id = input<number>();

  private onChange: onChangeFn<boolean> = () => {};
  private onTouch: onTouchFn = () => {};

  onToggle(): void {
    this.checked.update(value => !value);
    this.onChange(this.checked());
    this.onTouch();
  }

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: onChangeFn<boolean>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: onTouchFn): void {
    this.onTouch = fn;
  }
}
