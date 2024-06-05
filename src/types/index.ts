export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder | null;
	setCatalog(items: IProduct[]): void;
	addToBasket(product: IProduct): void;
	removeFromBasket(product: IProduct): void;
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	selected: boolean;
}

export interface IProductInBasket extends IProduct {
	index: number;
}

export interface IPaymentForm {
	payment: string;
	address?: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder extends IPaymentForm, IContactsForm {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ISuccessForm {
	description: number;
}

export interface IOrderValidate {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

export interface IModal {
	content: HTMLElement;
}

export interface IBasket {
	list: HTMLElement[];
	total: number;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
