import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs,
  Response, Request, Headers } from '@angular/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizedHttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    const token = localStorage.getItem(AuthorizationService.TOKEN);
    if (token) {
      options.headers.set('Authorization', token);
    }
    super(backend, options);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem(AuthorizationService.TOKEN);
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      if (token) {
        options.headers.set('Authorization', token);
      }
    } else {
      if (token) {
        url.headers.set('Authorization', token);
      }
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: AuthorizedHttpService) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
