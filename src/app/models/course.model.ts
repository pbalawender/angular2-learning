export class Course {
  public id: number = Math.random();

  constructor(public name: string,
              public duration: number,
              public date: Date,
              public description: string) {
  }
}
