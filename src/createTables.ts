// import { pool } from "./db";

const owner = `CREATE TABLE IF NOT EXISTS
owner(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE
)`;
// pgadmin4 - ALTER TABLE owner ADD UNIQUE (username), unique 속성추가
const customer = `CREATE TABLE IF NOT EXISTS
customers(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(128) NOT NULL,
  snsID VARCHAR(128),
  owner_id INT NOT NULL,
  FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)`;
//mysql로 변경하면서 id 부분을 serial로 할시 관계형성때 문제가생겼다.
// foreign key값이 연결되는 owner.id와 같은 sereal 이어야되는데 그렇게되면
// sereal key는 테이블당 1개의 칼럼에게만 부여가 가능한데 customers.id와 중복되기때문이다.
// 결국 같은 기능의 속성으로 "int NOT NULL AUTO_INCREMENT PRIMARY KEY" 부여

const orders = `CREATE TABLE IF NOT EXISTS
orders(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    owner_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
)
`;

const product = `CREATE TABLE IF NOT EXISTS
product(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(128),
pictures VARCHAR(128),
owner_id INT NOT NULL,
FOREIGN KEY(owner_id) REFERENCES owner(id) ON DELETE CASCADE
)
`;