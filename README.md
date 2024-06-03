# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание

Онлайн магазин для веб разработчика.

## Документация

## Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:
Model - работа с загрузкой данных по API, сохранение и работа с данными полученными от пользователя.
View - отображает интерфейс для взаимодействия с пользователем, отлавливает и сообщает о произошедших событиях.
EventEmitter выступает в роли Представителя (Presenter) - связывает модели данных с отображением интерфейсов при сработке какого нибудь события, управляя взаимодействием между ними.

### Описание базовых классов

#### Класс Арi
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Конструктор класса:
baseUrl: string; - принимает базовый Url для доступа к серверу
options: RequestInit; - опции для доступа к различным параметрам
Методы:
- `handleResponse(response: Response): Promise<object>` - обработчик ответа сервера.
- `get(uri: string)` - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - принимает изменяющеюся часть url-адреса, принимает данные в виде объекта для отправки на сервер, type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'.

#### Класс Component
Класс для компонентов интерфейса,  реализует методы изменения текста, изображения, переключение класса. Класс является дженериком и в переменной Т принимает тип данных компонентов.
Конструктор класса:
constructor(protected readonly container: HTMLElement) - принимает DOM элемент для вставки туда контента
Методы:
- `setText`, `setImage`, `toggleClass` для изменения состояния элементов.
- `render` для заполнения свойств элемента и получения его в формате HTMLElement.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Методы:
- `on` - для подписки на событие.
- `off` - для отписки от события.
- `emit` - уведомления подписчиков о наступлении события соответственно.
- `onAll` - для подписки на все события.
- `offAll` - сброса всех подписчиков.
- `trigger` - генерирует заданное событие с заданными аргументами. 

#### Класс Model
Реализует методы отслеживания изменений компонентов.
Kонструктор класса:
constructor(data: Partial<T>, protected events: IEvents)  - принимает данные и событиеK
Методы:
- `emitChanges` сообщает об изменение модели

### Описание классов Model, которые позволяют хранить и обрабатывать данные с сервера и от пользователей.

### Класс Product
Класс наследуется от базового класса Model и расширяется интерфейсом IProduct. Данный класс хранит информацию о товаре.
Поля класса:
- id: string - идентификатор товара в магазине
- description: string - описание товара
- image: string - URL адрес картинки товара
- title: string - название товара
- category: string - категория товара
- status: boolean - статус товара, в корзине или нет
- price: number - цена товара

### Класс AppState
Класс наследуется от базового класса Model и расширяется интерфейсом IAppState.  Данный класс хранит состояние приложения.

Поля класса:
- basket: Product[] - список товаров в корзине
- catalog: Product[] - каталог товаров
- order: IOrder - заказ
- formErrors: FormErrors - ошибки при заполнении полей форм

Методы класса:
- `setCatalog` - устанавливает каталог продуктов
- `addToBasket` - добавляет продукт в корзину
- `removeFromBasket` - удаляет продукт из корзины
- `getTotalBasketPrice` - считает итоговую стоимость товаров в корзине
- `getEmptyOrder` - устанавливает пустые поля в формах оформления заказа
- `getCountProductInBasket` - считает количество товаров в корзине
- `setOrderFields` - устанавливает значения в форму заказа
- `validateOrder` - проверяет внесены ли данные в поля формы с оплатой
- `validateContacts` - проверяет внесены ли данные в поля формы с контактами
- `addProductsToOrder` - добавить все товары из корзины в заказ
- `clearBasket` - очистить корзину
- `resetSelected` - удаляет информацию о том, что товар в корзине. Товар снова можно купить
- `clearOrder` - очистить поля заказа


### Описание классов View которые позволяют отображать элементы страницы с полученными данными и взаимодействовать с пользователем.

### Класс Page
Класс для отображения главной страницы. Наследуется от базового класса Component и расширяется интерфейсом IPage. Класс отображает каталог товаров на главной странице, отображает количество товаров на иконке корзины. При открытии модального окна, страница блокируется.

Конструктор класса:

constructor(container: HTMLElement, protected events: IEvents) - container - DOM элемент всей страницы, events - ссылка на менеджер событий

Поля класса:

- counter: HTMLElement - DOM элемент счетчика товаров в корзине
- catalog: HTMLElement - DOM элемент каталога товаров
- wrapper: HTMLElement - DOM элемент главной страницы
- basket: HTMLElement - DOM элемент корзины

Методы класса:

- `set counter(value: number)` - установка счетчика товаров в корзине
- `set catalog(items: HTMLElement[])` - установка списка товаров
- `set locked(value: boolean)` - для блокировки страницы при открытии модального окна

### Класс Card
Класс описывает компоненту карточки товара, наследуется от базового класса Component и расширяется интерфейсом IProduct. Данные класс служит для отображения карточки и информации по ней в галлереи товаров, просмотре карточки товара и корзине.

Конструктор класса:

constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions)
- blockName - имя блока
- container - DOM элемент карточки
- actions - действия с карточкой

Поля класса:

- title: HTMLElement - DOM элемент названия продукта
- image: HTMLImageElement - DOM элемент картинки продукта
- category: HTMLElement - DOM элемент категории продукта
- price: HTMLElement - DOM элемент цены продукта
- description: HTMLElement - DOM элемент описания продукта
- button?: HTMLButtonElement - DOM элемент кнопки в продукте

Методы класса:

- `set id(value: string)` - устанавливает id товара
- `get id(): string` - получает id товара
- `set title( value: string)` - устанавливает название товара
- `get title(): string` - получает название товара
- `set catetory(value: string)` - устанавливает категорию товара
- `set price (value: number | null)` - устанавливает цену товара
- `get price (): number` - получает цену товара
- `set image(value: string)` - устанавливает картинку товару
- `set description(value: string | string[])` - устанавливает описание товара
- `set button (value: string )` - устанавливает текст кнопки покупки
- `set selected (value: boolean)` - устанавливает состояние кнопки товара

### Класс CardPreview
Класс наследуется от класса Card. Класс описывает карточку товара при открытии в модальном окне.

Поля класса:
- description: HTMLElement - DOM элемент описания карточки товара.

Конструктор класса
- container: HTMLElement -  DOM элемент карточки товара
- actions?: ICardActions - действия с карточкой

Метод класса:
- `set description(value: string)` - устанавливает описание товара

### Класс Basket
Класс наследуется от базового класса Component и расширяется интерфейсом IBasket. Отвечает за работу с корзиной, отражает информацию по товарам в корзине, стоимости каждой единицы товара, дает возможность удалить товар из корзины, считает и показывает общую сумму заказа.

Поля класса:
- list: HTMLElement - DOM элемент списка товаров в корзине
- total: HTMLElement - DOM элемент общей стоимости товаров в корзине
- button: HTMLButtonElement - DOM элемент кнопки корзины оформления заказа

Конструктор класса:
- blockName - имя блока
- container- DOM элемент компонента корзины
- events` - ссылка на менеджер событий для управления товарами в корзине

Методы класса:
- `set total(price: number)` - устанавливает итоговую стоимость товаров в корзине
- `set list(items: HTMLElement[])` - устанавливает содержимое корзины
- `toggleButton(isDisabled: boolean)` - управляет блокировкой кнопки "оформить"
- `updateIndices()` - определяет индекс товара в корзине

### Класс ProductItemBasket
Класс наследуется от базового класса Component и расширяется интерфейсом IProductInBasket. Класс отражает информацию о товаре в корзине, его названии, стоимости и индексе.

Поля класса:
- index: HTMLElement - DOM элемент индекса товара в корзине
- title: HTMLElement - DOM элемент названия товара
- price: HTMLElement - DOM элемент стоимости товара
- button: HTMLButtonElement - DOM элемент кнопки удалить товар из корзины

Конструктор класса:
- blockName: string - имя блока
- container: HTMLElement- DOM элемент компонента корзины

Методы класса:
- `set title(value: string)` - устанавливает название товара в корзине
- `set index(value: number)` - устанавливает индекс товара в корзине
- `set price(value: number)` - устанавливает стомости товара в корзине

### Класс Modal
Класс наследуется от базового класса Component и расширяется интерфейсом IModal. Отвечает за работу с модальными окнами.

Поля класса:
- closeButton: HTMLButtonElement - DOM элемент кнопки закрытия модального окна
- content: HTMLElement - DOM элемент с информацией

Конструктор класса:
- container: HTMLFormElement - DOM элемент компонента модального окна
- events: IEvents- ссылка на менеджер событий

Методы класса:
- `set content(value: HTMLElement)` - определяет содержимое модального окна
- `open` - открытие модально окна
- `close` - закрытие модального окна
- `render(data: IModal): HTMLElement` - определяет вид формы

### Класс Form
Класс наследуется от базового класса Component и расширяется интерфейсом IFormState. Отвечает за работу с формой заказа.

Поля класса:
- submit: HTMLButtonElement - DOM элемент кнопки отправки формы
- errors: HTMLElement - DOM элемент отображения ошибки валидации формы

Конструктор класса:
- container: HTMLFormElement - DOM элемент компонента формы
- events: IEvents- ссылка на менеджер событий

Методы класса:
- `onInputChange(field: keyof T, value: string)` - обрабатывает изменения в полях формы
- `set valid(value: boolean)` - определяет доступность кнопки
- `set errors(value: string)` - сообщает об ощибке
- `render(state: Partial<T> & IFormState)` - определяет вид формы

### Класс OrderForm
Класс наследуется от базового класса Form и расширяется интерфейсом IPaymentForm. Класс описывает форму оплаты товара при оформлении заказа.

Поля класса:
- card: HTMLButtonElement - DOM элемент оплаты заказа картой
- cash: HTMLButtonElement -  DOM элемент оплаты заказа при получении
- address: HTMLInputElement -  DOM элемент адреса доставки

Конструктор класса:
- blockName string - имя блока
- container: HTMLFormElement - элемент формы оплаты
- events: IEvents - ссылка на менеджер событий

Метод класса:
- `clear()` - удаляет информацию из полей формы

### Класс ContactsForm
Класс наследуется от базового класса Form и расширяется интерфейсом IContactsForm. Класс описывает форму ввода контактных данных.

Конструктор класса:
- container: HTMLFormElement - DOM элемент формы с контактными данными
- events - ссылка на менеджер событий

Метод класса:
- `clear()` - удаляет информацию из полей формы

### Класс SuccessForm
Класс наследуется от базового класса Component расширяется интерфейсом ISuccessForm. Класс описывает форму подтверждения заказа.

Поля класса:
- button: HTMLButtonElement - DOM элемент кнопки закрытия "За новыми покупками"
- description: HTMLElement - DOM элемент компонента модального окна

Конструктор класса:
- blockName: string - имя блока
- container: HTMLElement - DOM элемент формы оформленного заказа
- actions? - действия с формой заказа

Метод класса:
- `set description(value: number)` - устанавливает описание общей стоимости заказа

## Основные типы данных
```
Интерфейс, описывающий глобальное состояние приложения
interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  order: IOrder | null;
  setCatalog(items: IProduct[]): void;
  addToBasket(product: IProduct): void;
  removeFromBasket(product: IProduct): void;
}

Интерфейс, описывающий структуру продукта
 interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
	selected: boolean;
}

Интерфейс описывает товар в списке корзины
interface IProductInBasket extends IProduct {
	index: number;
}

Интерфейс отображения формы оплаты
interface IPaymentForm {
  payment: string;
  address: string;
}

Интерфейс отображения формы контактов
interface IContactsForm {
  email: string;
  phone: string;
}

Интерфейс для данных о заказе
interface IOrder extends IPaymentForm, IContactsForm {
  items: string[]
  total: number
}

Интерфейс описывающий ответ успешной покупки
interface IOrderResult {
	id: string;
	total: number;
}

Интерфейс описывает форму успешного заказа
interface ISuccessForm {
	description: number;
}

Интерфейс используется для валидации полей при заполнении модели заказа
interface IOrderValidate {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

Интерфейс описывающий содержимое модельного окна
interface IModal {
	content: HTMLElement;
}

Интерфейс описывающий отображение корзины
interface IBasket {
	list: HTMLElement[];
	total: number;
}

Интерфейс для отображения главной страницы
interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

type FormErrors = Partial<Record<keyof IOrder, string>>;

```
