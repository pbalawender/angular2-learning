import { ControlValueAccessor } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'date-picker'
})
export class DatePickerComponent implements ControlValueAccessor {

  // @Input()

  public writeValue(date: Date) {

  }

  public registerOnChange() {

  }

  public registerOnTouched() {

  }
}
