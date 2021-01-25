import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export default class DropdownDirective {
	@HostBinding('class.open') isOpen = false;

	@HostListener('click') toggleOpen() {
		this.isOpen = !this.isOpen;
	}
}