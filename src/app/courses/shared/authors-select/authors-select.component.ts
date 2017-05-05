import { Component, Input, forwardRef } from '@angular/core';
import { Author } from '../../../models/author.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const AUTHORS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthorsSelectComponent),
  multi: true
};

const noop = (_?: any) => {
  // noop
};

@Component({
  selector: 'authors-select',
  templateUrl: './authors-select.component.html',
  providers: [AUTHORS_VALUE_ACCESSOR]
})
export class AuthorsSelectComponent implements ControlValueAccessor {
  @Input() public allAuthors: Author[];
  @Input() public selectedAuthors: Author[];
  public onChange = noop;
  public onTouched = noop;

  public authorChanged(event: any, author: Author) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedAuthors.push(author);
      this.onChange(this.selectedAuthors);
    } else {
      const index = this.selectedAuthors.findIndex((selected) => selected.id === author.id);
      if (index > -1) {
        this.selectedAuthors.splice(index, 1);
        this.onChange(this.selectedAuthors);
      }
    }
  }

  public isAuthorSelected(author: Author): boolean {
    const isSelected = !!this.selectedAuthors.find((selected) => author.id === selected.id) ;
    return isSelected;
  }

  public writeValue(author: Author) {
    console.log(`writeValue ${JSON.stringify(author)}`);
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
