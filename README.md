# FunkoShop E-Commerce Project

The FunkoShop project is an online e-commerce platform built as part of a student project. It allows users to browse and purchase a wide range of Funko Pop products. The platform focuses on providing a secure, user-friendly experience with a scalable architecture.

The backend is powered by Java Spring Boot, ensuring a reliable and robust infrastructure. JSON Web Token (JWT) authentication is used to manage user sessions securely, allowing users to register, log in, and manage their profiles.

#### Key features include:

- Product Catalog: Users can explore an extensive range of Funko Pop figures, organized into categories such as themes, series, and characters. Each product page provides detailed information, including price, stock availability, high-quality images, and applicable discounts.

- Search and Filtering: Users can search for Funko Pops by name or keywords and filter products by category, availability, or discounted items, enabling an efficient shopping experience.

- Discounts and Special Offers: A discount system is integrated, allowing products to be offered at promotional prices. Discounted prices are automatically reflected during checkout, offering users an opportunity to enjoy special deals.

- Shopping Cart: Users can add products to a persistent shopping cart, which retains data even after page refreshes, allowing them to continue shopping without losing selected items.

- Order Management: Customers can easily place orders and track the status of their purchases from processing to shipment. The platform provides detailed order tracking to enhance customer experience.

- User Profiles: Each user has a dedicated profile section where they can update personal information, manage shipping addresses, and view their order history. This personalized approach ensures a smooth and user-friendly experience.

- Secure Payments: The application integrates secure payment processing, ensuring that all transactions are encrypted and compliant with European data protection standards. Payments are handled efficiently to provide a smooth checkout experience.

- Admin Panel: The platform features an admin panel, allowing administrators to manage product listings, update inventory, monitor customer orders, and apply discounts. The admin panel ensures that the shop operates smoothly, with the necessary tools for managing operations.

- Responsive Design: The front-end, built with Vue.js and styled using Tailwind CSS, ensures that the platform is fully responsive, providing a seamless shopping experience across various devices, including desktops, tablets, and smartphones.

By leveraging modern web technologies such as Spring Boot for the backend and Vue.js for the frontend, FunkoShop provides a comprehensive, secure, and user-friendly platform for Funko Pop collectors across Europe. The use of JWT for authentication ensures a secure and efficient user experience, making FunkoShop the go-to destination for Funko Pop fans in the region.



## Table of Contents
- [PreRequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [User Flow](#user-flow)
- [Project Structure](#project-structure)
- [Running Test](#running-test)
- [Screenshots](#screenshots)
- [Tools](#tools)
- [Future improvements](#future-improvements)
- [Contributors](#contributors)
- [Disclaimer](#disclaimer)


## Prerequisites 

Before running this project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)
- [Vue CLI](https://cli.vuejs.org/)
- [Stripe-Account](https://stripe.com)

## Installation

Instructions on how to install and set up the project.

```bash
git clone https://github.com/FactoriaF5-Asturias/P3-Digital-Academy-Project-FunkoShop-Frontend.git
```

### .env

```bash
# API endpoint URL
VITE_API_ENDPOINT=http://localhost:8080/api/v1

# Page size for pagination
VITE_PAGE_SIZE=10

# Stripe public key for processing payments
VITE_STRIPE_PUBLIC_KEY= your_stripe_public_key_here
```
### Stripe

- Create an account on [Stripe](https://stripe.com) if you don't already have one.
- After setting up your account, you’ll get a public key from Stripe.

- Add this secret key to your .env file as an environment variable, like this:

```
VITE_STRIPE_PUBLIC_KEY=your_private_key_here
```
This key is needed to securely process payments through Stripe.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## User Flow

![user-flow](https://i.imgur.com/B4SbQu5.jpeg)


## Project Structure

Below is an overview of the main directories and files in the FunkoShop project:


```
.vscode/                 # Visual Studio Code settings
node_modules/            # Node.js modules
public/                  # Public files, such as the index.html
src/                     # Main application source code
  ├── __tests__/         # Unit and integration tests
  ├── assets/            # Static assets (images, icons, CSS)
  │   ├── icons/         # Icons used in the project
  │   ├── img/           # Images used in the project
  │   └── main.css       # Global CSS file
  ├── components/        # Vue components for different features
  │   ├── AdminDashboard/  # Admin dashboard components
  │   ├── auth/            # Authentication components
  │   ├── BaseComponents/  # Common base components
  │   ├── Cards/           # Card components for different sections
  │   ├── Category/        # Category-related components
  │   ├── Checkout/        # Checkout page components
  │   ├── Footer/          # Footer components
  │   ├── Form/            # Form-related components
  │   ├── HomePage/        # Home page components
  │   ├── NavBar/          # Navigation bar components
  │   ├── order/           # Order-related components
  │   ├── ProductDetail/   # Product detail components
  │   ├── Products/        # Product management components
  │   ├── review/          # Review-related components
  │   ├── ShoppingCart/    # Shopping cart components
  │   └── UserManagement/  # User management components
  ├── composables/        # Reusable composition functions
  ├── core/               # Core logic
  │   ├── apis/           # API services
  │   └── models/         # Data models
  ├── language/           # Localization setup
  │   ├── json/           # Language JSON files
  │   └── language.js     # Language setup file
  ├── router/             # Vue Router configuration
  ├── stores/             # Pinia stores for state management
  │   ├── cart/           # Store for shopping cart state
  │   ├── category/       # Store for category state
  │   ├── favorites/      # Store for user favorites
  │   ├── modals/         # Store for modals
  │   ├── newLetters/     # Store for newsletters
  │   ├── order/          # Store for order state
  │   ├── Profile/        # Store for user profile
  │   ├── review/         # Store for reviews
  │   ├── auth.js         # Authentication store
  │   ├── logout.js       # Store for logout functionality
  │   └── productStore.js # Store for products
  ├── views/              # Main view components
  │   ├── admin/          # Admin-related views
  │   ├── notFound/       # 404 view
  │   └── user/           # User-facing views
  │       ├── CheckoutView.vue  # Checkout view
  │       ├── HomeView.vue      # Home view
  │       ├── ProductView.vue   # Product details view
  │       └── UnsubscribeView.vue # Unsubscribe view
  ├── App.vue             # Root Vue component
  └── main.js             # Vue app entry point

.env                      # Environment variables
.eslintrc.js              # ESLint configuration
.gitignore                # Files and directories to ignore in git
.prettierrc.json          # Prettier configuration
index.html                # Main HTML file
jsconfig.json             # JavaScript configuration
package-lock.json         # Lock file for npm dependencies
package.json              # Project dependencies and scripts
postcss.config.js         # PostCSS configuration
README.md                 # Project documentation
tailwind.config.js        # Tailwind CSS configuration
vite.config.js            # Vite configuration
vitest.config.js          # Vitest configuration


```

## Running Test with [Vitest](https://vitest.dev/)

To ensure everything is working as expected, you can run the unit and integration tests included in the project. Use the following command to execute all tests:
```bash
npm run test:unit
```
This will automatically run all the tests defined in the src/test/ directory, validating the functionality of the different components, including services, controllers, and data layers.
### Important Notes:
- Make sure your database is properly set up and running if your tests depend on database interactions.
- If you have specific test profiles or configurations (such as test databases), ensure they are correctly set up in your application-test.properties or other test-related configuration files.
- The results of the tests will be displayed in the terminal, and you can check detailed reports in the target/surefire-reports folder after execution.
Running the tests regularly helps ensure that new changes do not break existing functionality and keeps the codebase reliable.

## Screenshots
 Home
![home](https://i.imgur.com/RsoGVx4.png)
 Products
![products](https://i.imgur.com/zQAvU0f.png)
 Checkout
![checkout](https://i.imgur.com/ZT0fxr5.png)
 Dashboard
![dashboard](https://i.imgur.com/epHWjKJ.png)

## Tools

- Visual Studio Code
- Vue 3 Composition API
- Pinia
- Router
- JavaScript
- TailwindCSS
- PostCSS
- Axios
- Stripe
- vue-i18n
- Vitest
- ESLint
- Figma


## **Known Issues**
```markdown
### Known Issues

- Issue 1: Tracking does not work as expected; there are issues with the order tracking system. This is under review for future improvements.

- Issue 2: Create invoice when order is completed is not working as expected.


Feel free to open an issue if you encounter something not listed here.
```

## Future improvements
Here are some planned features or improvements for future versions of the project:

- <strong>Enhanced Tracking System:</strong> Fix the current issues with order tracking and improve tracking accuracy.
- <strong>Enhanced Invoice Creation:</strong> Fix the current issues with order invoices.
- <strong>Social Login:</strong> Implement login using third-party services like Google and Facebook.
- <strong>General Improvements:</strong> Continuous refinement of the functionality and user experience

## Contributors


### GitHub:
- Vero Doel: [Miharu669](https://github.com/Miharu669)
- Olena Andrushchenko: [OlenaAndrushchenko](https://github.com/OlenaAndrushchenko)
- Diego Fernandez: [diegofdez56](https://github.com/diegofdez56)
- Javier Martinez: [devjmv](https://github.com/devjmv)
- Bego Blanco: [begoblanco](https://github.com/begoblanco)
- Aitor Garcia: [aitorgarciadev](https://github.com/aitorgarciadev)

## BackEnd

- Backend Repo: [FunkoShop-Backend](https://github.com/FactoriaF5-Asturias/P3-Digital-Academy-Project-FunkoShop-Backend)

## Disclaimer

This project is developed as part of a bootcamp learning experience and is intended for educational purposes only. The creators and contributors are not responsible for any issues, damages, or losses that may occur from using this code.

This project is not meant for commercial use, and any trademarks or references to third-party services (such as Funko) belong to their respective owners. By using this code, you acknowledge that it is a work in progress, created by learners, and comes without warranties or guarantees of any kind.

Use at your own discretion and risk.



### <strong> Thank You! </strong> ❤️
