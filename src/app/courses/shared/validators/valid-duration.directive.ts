import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[validDuration]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDurationDirective, multi: true}]
})
export class ValidDurationDirective implements Validator {
  private valFn = validateDurationFactory();

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

function validateDurationFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value && parseInt(c.value, 10) === 0) {
      return {
        zero: true
      };
    } else {
      return null;
    }
  };
}
