import { pool } from "./db";

const owner = `CREATE TABLE IF NOT EXISTS
owner(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL
)`;
// pgadmin4 - ALTER TABLE owner ADD UNIQUE (username), unique 속성추가
const customer = `CREATE TABLE IF NOT EXISTS
customer(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(128) NOT NULL,
  snsID VARCHAR(128),
  owner_id INT NOT NULL,
  CONSTRAINT owner FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)`;

const orders = `CREATE TABLE IF NOT EXISTS
orders(
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    owner_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT customer FOREIGN KEY(customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    CONSTRAINT owner FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
)
`;

const product = `CREATE TABLE IF NOT EXISTS
product(
id SERIAL PRIMARY KEY,
name VARCHAR(128),
pictures VARCHAR(128),
owner_id INT NOT NULL,
CONSTRAINT owner FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)
`;

export const createTableFn = () => {
  //   pool.query(owner, (err, res) => {
  //     console.log(err);
  //     console.log(res);
  //   });
  //   pool.query(customer, (err, res) => {
  //     console.log(err);
  //   });
  //   pool.query(orders, (err, res) => {
  //     console.log(err);
  //   });
  //   pool.query(product, (err, res) => {
  //     console.log(err);
  //   });
};
