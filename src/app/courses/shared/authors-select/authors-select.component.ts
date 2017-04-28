import { Component, Input } from '@angular/core';
import { Author } from '../../../models/author.model';
@Component({
  selector: 'authors-select',
  templateUrl: './authors-select.component.html'
})
export class AuthorsSelectComponent {
  @Input() public authors: Author[];

}
