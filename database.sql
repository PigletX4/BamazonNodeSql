DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
position INT NOT NULL,
item_id INT NULL,
product_name VARCHAR(20) NULL,
department_name VARCHAR(20) NULL,
price DECIMAL (4,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (position)
);

INSERT INTO products (position, item_id, product_name, department_name, price, stock_quantity)
VALUES ('2', '60', 'Toothpaste', 'productsproductsproductsproducts', '5.00', '15');
