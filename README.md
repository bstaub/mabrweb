# Projekt2dummy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Setup

enviroments: firebase config erstellen für test und prod

```npm install firebase angularfire2```

```npm install ts-node```



## Feature Set

### Shop functionality

#### Shop Front Page (32h)

- Featured Products with link to corresponding product detail page
- Features for Latest Products, Slider

#### Products (16h)

- Products fetched from FireBase backend (no cache first)
- Sorting: Products can be sorted by date created, price and name (8h)
- Products can be viewed in a grid or a list view (ok)
- Products are shown paged via a PagingService (8h)
- When logged in as a user with adminstrative rights, additional buttons are shown for product CRUD operations
- Categories (ok)

#### Product CRUD (16h)

- Add a new product (Admin CRUD) 16h
- Edit existing product
- Delete existing product
- Images handled with Firebase Storage  (exclusiv)

#### Services

- Messageservice (Success and Failure Message output for User) (8h)
- Settingsservice (Settings can be defined globaly) (4h)
- Filestorageservice (Image can be stored in Firebase) ok
- PageingService (List can paged) (8h)
- PageService (SEO) (4h)

#### Cart

- Products can be added from the list/grid View or product detail view
- Cart is handled via a CartService (OrderService)
- (Adding the same product multiple times, increases the amount in cart)  (4h)
- Cart has a dedicated cart page  (8h)
- Quantity of each cart item can be adjusted via cart page
- Cart can be cleared at once
- Single products can be removed from cart
- Subtotal and Totals will be calculated on the fly
- Link to Checkout is available

#### Checkout

- Prefill fields, if user is already logged in
- Enter Address, Shipping Method and Payment Data with Validation
- Show review of the order before final submit
- When submitting a order, OrderService creates a new Order linked to the user
- (Anonymous Orders are possible too, in that case OrderService creates a new anonymous order)
- Order summary is shown in the header during the checkout process
- (Mail to Customer and Shop Admin)

#### Authentication

- Checkout: As registered user / (guest anonymous)
- Sign up: Create user account
- Log in: General login or during checkout
- Role based authentication

#### Account

- Create new shop user accounts
- Login with existing user account
- User Profile, Email, Password, Firstname, Lastname are updateable via account page
- Password recovery functionality for lost user passwords
- (Order history is visible to logged in users)
- Role base authentication via Firebase, roles can be assigned to users like isAdmin

#### Orders

- Checkout process generates Order for registered user or guest
- Order / Confirmation Email for Shop/User/Guest
- Orders can be viewed by logged in user

### Security

- FireBase Security Rules for Shop User / Admin

#### General

- Search (with Typeahead) ->name, descrilption (no fulltext search, only filters)

### SEO Optimisation

- Site Title, Description per Page
- Angular Universal

### Styling 

- Ux Design

### Deployment

- Defninition of development und deployment process, Testing Works for DEV

### Testing

- Jasmine Testing

### Presentation

- Slides (Problems, Solution, Learnings)

## UX-Test

UX-Tests are documented in [xxx](./ux-testing/xxx.md).

### Project Milestones

- Feature Development finished (end of november 2018)
- UI Finished (end december 2018)
- Jasmine (end december)


### Custom Express/MongoDB Backend

Implementation started with a custom MEAN-architecture, which used a mLab-database.
We switched to «serverless» with Firebase due to several reasons:

- Backend not in the scope of this front-end-project and the CAS-FEE-task.
- Firebase provides complete functionality set


The unfinished project can be found under: [XXX](https://github.com/xxx)

### Special Mentions

- All product data changes are propagated in real time to all clients without reloading, via Firebase Cloud Firestore and reactive programming with RxJs
- Off Canvas Navigation is handled via Service, several CSS classes needs to be applied to different components

## Possible future features and updates

- Speed up initial page load with server rendered start page and/or lazy load modules
- SEO, was out of scope as it invloves server side rendering with Angular Universal
- Product categories
- Product stock amounts
- UI for editing Featured Products-slider
- UI for editing banner on start page
- UI for editing users/user-roles (admin only) instead of Firebase-only (i. e. User CRUD)
- Save cart for logged in user
- Login option during checkout
- Customer Address or multiple delivery addresses could be handled via account profile page
- Attach real payment gateways
- Multilanguage functionality (i18n)
- Order Detail View for logged in users via account/orders
- Better solution for responsive tables
- Lazy load some modules that are not needed on inital page load
- Separate routes to modules
- Multiple Product Images CRUD
- Implementing a state management (i. e. ngrx)
- Social sharing functionality
- Authenticate with Google, Facebook and other OAUTH services


#### (Optional Rating)

- Products can be rated by logged in users from 1 to 5
- User can change his previous rating
- Previous rating is reflected in the UI
- Overall rating gets calculated and displayed instantly
- Rating is updated in a reactive manner, even for cached products


####

```
Module:

* User Module (Shop ist zugäugig für alle Benutzer. Bestellung erfolgt mit eingelogtem Benutzer)
* Security (Rollen, Datenbank Berechtigung)
* Bestellung (Bestell-Prozess abbilden)
* Artikel CRUD (Möglichkeit zum Erfassen, Bearbeiten, Löschen,Lesen von Artikeln)
* Produktsuche (Fülltest Suche über Produktliste)
* Shop Einstiegsseite (zB. Slider, Top Produkte..)


Optional:

* Artikelfilter
* Aktionen
* Kommentar und Feedback (Rating)
* Bestellstatistiken
* Push Notification
```

