export class Course {
  constructor(public id: number,
              public name: string,
              public duration: number,
              public date: Date,
              public description: string,
              public topRated: boolean = false) {
  }
}
