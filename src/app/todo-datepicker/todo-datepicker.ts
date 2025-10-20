import {
  ChangeDetectionStrategy,
  Component,
  signal,
  forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'todo-datepicker',
  templateUrl: 'todo-datepicker.html',
  styleUrl: 'todo-datepicker.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoDatepicker),
      multi: true
    }
  ],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDatepicker implements ControlValueAccessor {
  isOpen = signal<boolean>(false);
  selected = signal<Date>(new Date());
  readonly minDate = new Date();

  private onChange: (value: Date) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  writeValue(value: Date): void {
    if (value) {
      this.selected.set(value);
    }
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onToggle = () => {
    this.isOpen.update(value => !value);
  }

  onDateSelected = (date: Date) => {
    this.selected.set(date);
    this.isOpen.set(false);
    this.onChange(date);
    this.onTouched();
  }

  formatSelectedDate = (): string => {
    const selectedDate = this.selected();

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    if (selectedDate.getTime() === todayStart.getTime()) return 'Today';
    if (selectedDate.getTime() === tomorrowStart.getTime()) return 'Tomorrow';

    return selectedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
