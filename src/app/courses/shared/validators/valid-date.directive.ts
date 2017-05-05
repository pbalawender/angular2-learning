import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[validDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDateDirective, multi: true}]
})
export class ValidDateDirective implements Validator {
  private valFn = validateDurationFactory();

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

function validateDurationFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    console.log(c.value);
    if (!c.value) {
      return {
        empty: false
      };
    } else {
      return null;
    }
  };
}
