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

**Column**  
id, name, price, category  
**Type**  
integer, character varying(150), integer, character varying(150)  
**Nullable**  
not null, not null, not null, not specified  
**Indexes**  
"products_pkey" PRIMARY KEY, btree (id)  
**Referenced by**  
TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### users table

**Column**  
id, first_name, last_name, password_digest  
**Type**  
integer, character varying(255), character varying(255), text  
**Nullable**  
not null, not null, not null, not null  
**Indexes**  
"users_pkey" PRIMARY KEY, btree (id)  
**Referenced by**  
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (use_id) REFERENCES users(id)

### orders table

**Column**  
id, status, user_id  
**Type**  
integer, character varying(150), bigint  
**Nullable**  
not null, not null, not null  
**Indexes**  
"orders_pkey" PRIMARY KEY, btree (id)  
**Foreign-key constraints**  
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)  
**Referenced by**  
TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

### order_products table

**Column**  
id, quantity, order_id, product_id  
**Type**  
integer, integer, bigint, bigint  
**Nullable**  
not null, not null, not specified, not specified  
**Indexes**  
"order_products_pkey" PRIMARY KEY, btree (id)  
**Foreign-key constraints**  
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)  
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
