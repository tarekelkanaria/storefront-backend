# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  - [x] `Get http://localhost:3000/products`
- Show
  - [x] `Get http://localhost:3000/products/:id`
- Create [token required]

  - [x] `Post http://localhost:3000/products`

- [OPTIONAL] Top 5 most popular products
  - [x] `GET http://localhost:3000/products/most-popular`
- [OPTIONAL] Products by category (args: product category)
  - [x] `Get http://localhost:3000/products/category/:category`

#### Users

- Index [token required]
  - [x] `Get http://localhost:3000/users`
- Show [token required]
  - [x] `Get http://localhost:3000/users/:id`
- Create N[token required]
  - [x] `Post http://localhost:3000/users`

#### Orders

- Current Order by user (args: user id)[token required]
  - [x] `GET http://localhost:3000/users/:id/orders`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
  - [x] `GET http://localhost:3000/users/:id/completed-orders`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema

### products table

id: SERIAL PR KEY, name string NOT NULL, price INTEGER NOT NULL, category string.

### users table

id: SERIAL PR KEY, first_name string NOT NULL, last_name string NOT NULL, password_digest text NOT NULL.

### orders table

id: SERIAL PR KEY, status string NOT NULL, user_id bigint NOT NULL REFERENCES users(id).

### order_products table

id: SERIAL PR KEY, quantity integer NOT NULL, order_id bigint NOT NULL REFERENCES orders(id), product_id bigint NOT NULL REFERENCES products(id).
