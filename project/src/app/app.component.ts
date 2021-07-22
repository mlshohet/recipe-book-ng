import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  	trigger('divState', [
  		state('normal', style({
  			'background-color': 'red',
  			transform: 'translateX(0)',
  		})),
  		state('highlighted', style({
  			'background-color': 'blue',
  			transform: 'translateX(100px)',
  		})),
  		transition('normal <=> highlighted',
  			animate(300)
  		),
  		// transition('highlighted => normal',
  		// 	animate(800)
  		// ),
  	]),
  	trigger('wildState', [
  		state('normal', style({
  			'background-color': 'red',
  			'border-radius': '0px',
  			transform: 'translateX(0) scale(1)',
  		})),
  		state('highlighted', style({
  			'background-color': 'blue',
  			//'border-radius': '50px',
  			transform: 'translateX(100px) scale(1)',
  		})),
  		state('shrunken', style({
  			'background-color': 'green',
  			'border-radius': '50px',
  			transform: 'translateX(0) scale(0.5)',
  		})),
  		transition('normal => highlighted',
  			animate(300)
  		),
  		transition('shrunken <=> *',
  			[
  			
  				animate(500, style({
  					'background-color': 'orange'
  				})),
  					animate(500, style({
  					'border-radius': '50px'
  				})),
  				animate(500)
  			]),
  		]),
  	],
})
export class AppComponent implements OnInit {
	state = "normal";
	wildState = "shrunken";

	constructor(private authService: AuthService) {}

	onAnimate() {
		this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
		this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
	}

	onShrink() {
		this.wildState = 'shrunken';
	}

	ngOnInit() {
		this.authService.autoLogin();
	}
}
