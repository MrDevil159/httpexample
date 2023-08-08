import {
    HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { map, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request is on its way');
    console.log(req.url);
    const modifiedRequest = req.clone({
      headers: req.headers.append('AuthorizationMaaz', 'xyz'),
    });
    return next.handle(modifiedRequest);
  }
}
