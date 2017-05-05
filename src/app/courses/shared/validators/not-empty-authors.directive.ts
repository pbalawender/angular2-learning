import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[notEmptyAuthors]',
  providers: [{provide: NG_VALIDATORS, useExisting: NotEmptyAuthorsDirective, multi: true}]
})
export class NotEmptyAuthorsDirective implements Validator {
  private valFn = validateCoursesFormAuthorsFactory();

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

function validateCoursesFormAuthorsFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value && c.value.length === 0) {
      return {
        'not-empty-authors': false
      };
    } else {
      return null;
    }
  };
}
