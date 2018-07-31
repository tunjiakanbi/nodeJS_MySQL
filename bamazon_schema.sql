DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 4) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polo shirt", "mens clothing", 49.99, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polo pants", "mens clothing", 29.95, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("revlon lipstick", "womens clothing", 19.45, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CK Perfum", "womens clothing", 29.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("red addidas", "mens shoes", 67.99, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("white puma", "mens shoes", 87.31, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blue shorts", "childrens clothing", 39.45, 102);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("green shoes", "childrens clothing", 41.95, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("black belt", "accesories", 14.99, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("brown wallet", "accesories", 9.99, 25);

SELECT * FROM products;