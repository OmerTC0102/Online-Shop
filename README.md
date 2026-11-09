A multi-page online shop application built with React and Vite. It uses React Router for navigation, Context API for authentication, Zustand for cart management, and DummyJSON API for product data.

TECHNOLOGIES
1-React
2-Vite
3-React Router
4-Context API and useReducer
5-Zustand
6-Custom Hooks
7-Fetch API

CSS
1-Project Structure
2-api/ – Product and authentication API functions.
3-hooks/ – Custom hooks (useFetch, useLocalStorage).
4-context/ – Authentication context.
5-store/ – Zustand cart store.
6-components/ – Reusable components.
7-pages/ – Application pages.
8-App.jsx – Application routes.
9-main.jsx – Application entry point.

State Management – Reasoning Questions

1) State Choices

* User: Stored in Context because authentication information is needed by multiple components.
* Cart: Stored in Zustand because it changes frequently and is used in different components.
* Filters: Stored in URL query parameters so filtered pages can be shared.
* Product List: Managed by useFetch inside ProductList.
* Theme: Stored in localStorage using useLocalStorage to remember the preference.

2) Context vs Zustand

Context is suitable for authentication because user information does not change frequently. Zustand is better for the cart because it changes frequently and allows components to subscribe only to the state they need. Using Context for the cart could cause unnecessary re-renders.

3) Custom Hooks

The useFetch hook shares the loading, error, data and request cancellation logic. However, each component has its own data and state. ProductList and ProductDetail do not share fetched data.

4) Route Parameters

The product ID from the URL is a string. It is converted to a number when necessary, especially when comparing it with product IDs or using it in numeric operations.

5) Protected Routes

ProtectedRoute is not real security because users can modify client-side code and browser state. Real security requires server-side authentication, authorization and protected API endpoints.

6) Deep Links

On a plain static server, refreshing /products/3 may return a 404 error because the server looks for a physical file at that path. It works with the Vite development server because it provides SPA fallback and serves index.html for client-side routes.

SELF-STUDY

1-Query Parameters: Used useSearchParams to update URL parameters without losing existing filters.
2-LocalStorage: Used safe initialization and error handling to manage stored values.
3-Theme: Used CSS classes and CSS variables to implement light and dark themes.
4-Cart Persistence: Used Zustand's subscription mechanism to save cart changes to localStorage.

CHALLENGES

Understanding the differences between Context and Zustand, managing URL query parameters, and implementing persistent state were some of the main challenges during development.

INSTALLATION and RUNNING

* "npm install"
* "npm run dev"

Notes;

1-No Redux or third-party UI libraries were used.
2-The application uses DummyJSON as its product API.
3-The cart and theme preferences persist after page reloads.
4-Client-side route protection is only for user experience, not security.
