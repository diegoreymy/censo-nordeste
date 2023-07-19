import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiKey = environment.apiKey;
    const apiKeyReq = req.clone({ headers: req.headers.set('x-api-key', apiKey) });
    return next.handle(apiKeyReq);
  }
}
