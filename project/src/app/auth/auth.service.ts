import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model'; 

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	user = new BehaviorSubject<User>(null);
	private _tokenExpirationTimer: any;

	signUp(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1Y5-07NRJNzqInetvWzVXq_aVd1ITMRU',
			{
				email: email,
				password: password,
				returnSecureToken: true,
			}
		).pipe(
			catchError(this.handleError),
			tap(resData => {
				this.handleAuthentication(
					resData.email,
					resData.localId,
					resData.idToken,
					+resData.expiresIn,
				)
			})
		);
	}

	logIn(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1Y5-07NRJNzqInetvWzVXq_aVd1ITMRU',
			{
				email: email,
				password: password,
				returnSecureToken: true,
			}
		).pipe(
			catchError(this.handleError),
			tap(resData => {
				this.handleAuthentication(
					resData.email,
					resData.localId,
					resData.idToken,
					+resData.expiresIn,
				)
			})
		);
	}

	autoLogin() {
		const userData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(localStorage.getItem('userData'));
		if (!userData) {
			return;
		}

		const loadedUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate),
		);

		if (loadedUser.token) {
			this.user.next(loadedUser);
			const expirationDuration = new Date(
				userData._tokenExpirationDate
			).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logOut() {
		this.user.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if (this._tokenExpirationTimer) {
			clearTimeout(this._tokenExpirationTimer);
		}
		this._tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number) {
		//manges a timer for auto logOut
		this._tokenExpirationTimer = setTimeout(() => {
			this.logOut();
		}, expirationDuration);
	}

	private handleAuthentication(email: string, token: string, userId: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		const user = new User(
			email,
			userId,
			token,
			expirationDate,
		);
		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage: string;
			
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		
		console.log("error:",errorRes.error.error.message);
		switch(errorRes.error.error.message) {
				case 'EMAIL_EXISTS':
					errorMessage = "This email already exists";
					break;
				case 'EMAIL_NOT_FOUND':
					errorMessage = "Wrong username, or password";
					break;
				case 'INVALID_PASSWORD':
					errorMessage = "Wrong username, or password";
					break;
				default:
					errorMessage = "An unknown error has occured";
					break;
			}
		
		return throwError(errorMessage);
	}
}



