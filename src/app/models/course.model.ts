import { Author } from './author.model';
export class Course {
  constructor(public id: number,
              public name: string,
              public duration: number,
              public date: Date,
              public description: string,
              public authors: Author[],
              public topRated: boolean = false) {
  }
}
