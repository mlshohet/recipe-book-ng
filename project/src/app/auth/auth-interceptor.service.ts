import { Injectable } from '@angular/core';
import { 
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpParams,
} from '@angular/common/http';

import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return this.authService.user.pipe(
			take(1),
			exhaustMap(user => {
				console.log("User: ",user);
				if (!user) {
					return next.handle(req);
				}
				const modfiedReq = req.clone({
					params: new HttpParams().set('auth', user.id)
				});
				return next.handle(modfiedReq);
			})
		);
		return next.handle(req);
	}
}