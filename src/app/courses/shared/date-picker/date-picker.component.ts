import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import moment from 'moment';

const CUSTOM_DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

const noop = (_?: any) => {
  // noop
};

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  providers: [CUSTOM_DATE_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor {

  public onChange = noop;
  public onTouched = noop;
  private currentDate: any;

  public setValue(item) {
    this.value = item.target.value;
  }

  set value(newValue) {
    if (newValue) {
      this.currentDate = moment(newValue, 'YYYY-MM-DD').toDate();
      this.onChange(this.currentDate);
    }
  }

  get value() {
    return this.currentDate;
  }

  public getStringValue() {
    return moment(this.currentDate).format('YYYY-MM-DD');
  }

  public writeValue(dateString: string) {
    this.currentDate = moment(dateString, 'YYYY-MM-DD').toDate();
    this.onChange(this.currentDate);
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
