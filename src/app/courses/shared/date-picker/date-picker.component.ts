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
      this.currentDate = moment(newValue, 'YYYY-MM-DD');
    } else {
      this.currentDate = null;
    }
    this.onChange(this.value);
  }

  get value() {
    if (this.currentDate && this.currentDate.isValid()) {
      return this.currentDate.toDate();
    }
    return null;
  }

  public getStringValue() {
    if (this.currentDate && this.currentDate.isValid()) {
      return this.currentDate.format('YYYY-MM-DD');
    }
    return '';
  }

  public writeValue(dateString: string) {
    if (typeof dateString !== 'undefined'
      && moment(dateString, 'YYYY-MM-DD') !== this.currentDate) {
      this.currentDate = moment(dateString, 'YYYY-MM-DD');
      this.onChange(this.value);
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
