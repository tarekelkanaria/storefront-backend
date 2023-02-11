CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);