import uuid from 'uuid';

export class Course {
  public id: string;

  constructor(public name: string,
              public duration: number,
              public date: Date,
              public description: string) {
    this.id = uuid();
  }
}
