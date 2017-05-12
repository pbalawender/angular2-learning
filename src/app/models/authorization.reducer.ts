import { ActionReducer, Action } from '@ngrx/store';
import { User } from './user.model';

export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const userInfoReducer: ActionReducer<User> =  (userInfo: User = null  , action: Action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return userInfo;
  }
};
