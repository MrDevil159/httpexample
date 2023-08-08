import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Logging Outgoing Request: " + req.url);
        return next.handle(req).pipe(
            tap(
                (event => {
                    if(event.type === HttpEventType.Response) {
                        console.log("Logging Incoming Response: ");
                        console.log(event.body);
                        
                    }
                })
            )
        );
    }

}