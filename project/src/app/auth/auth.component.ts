import { Component, ComponentFactoryResolver, ViewChild, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.component';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
})

export class AuthComponent implements OnDestroy {
	isLoginMode = true;
	isLoading = false;
	error: string = null;
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

	private closeSub: Subscription;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver ,
	) {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
		const password = form.value.password;

		let authObs: Observable<AuthResponseData>;

		this.isLoading = true;

		if (this.isLoginMode) {
			authObs = this.authService.logIn(email, password);
		} else {
			authObs = this.authService.signUp(email, password);
		}

		authObs.subscribe(
			resData => {
				console.log(resData);
				this.isLoading = false;
				this.router.navigate(['/recipes']);
			}, 
			errorMessage => {
				this.isLoading = false;
				this.error = errorMessage;
				this.showErrorAlert(errorMessage);
			}
		);

		form.reset();
	}

	onHandleError() {
		this.error = null;
	}

	private showErrorAlert(message: string) {
		// const alertComp = new AlertComponent();
		//pass in the TYPE into the facotry resolver to return a factory
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
			AlertComponent
		);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
		
		componentRef.instance.message= message;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}

	ngOnDestroy() {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
	}
}

