import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionServiceInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercepting Transaction Service : ", req.headers);
        // req = req.clone({
        //     setHeaders: { 
        //         'Allow-Access-Control-Origin': '*',
        //         'Access-Control-Allow-Headers': 'allow-access-allow-origin'          
        //     }
        // });

        //         'Allow-Access-Allow-Origin': '*',
        
        console.log("Added new headers: ", req.headers.getAll);
        return next.handle(req);
    }
}