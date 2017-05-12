import { UserName } from './user-name.model';
export class User {

  constructor(public id: number,
              public fakeToken: string,
              public name: UserName,
              public login: string,
              public password: string) {
  }
}
