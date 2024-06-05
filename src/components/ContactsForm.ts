import { IContactsForm } from '../types/index';
import { IEvents } from './base/events';
import { Form } from './Form';

export class ContactsForm extends Form<IContactsForm> {
	protected _phoneNumber: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._phoneNumber = container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
		this._email = container.elements.namedItem('email') as HTMLInputElement;
	}

	set phoneNumber(value: string) {
		this._phoneNumber.value = value;
	}

	set email(value: string) {
		this._email.value = value;
	}

	clear() {
		this._phoneNumber.value = '';
		this._email.value = '';
	}
}
