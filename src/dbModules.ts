import { conn } from "./db";

module.exports = {
  test: async () => {
    const [time] = await conn.query(`select now()`);
    return time[0];
  },
  changePassword: async (password: string, email: string) => {
    await conn.query(
      `UPDATE owner SET password = '${password}' WHERE email = '${email}'`
    );
  },
  findSingleUser: async (value: string, type: string) => {
    const [rows] = await conn.query(
      `SELECT * FROM owner WHERE ${type} = '${value}'`
    );
    return rows[0];
  },
  createOwner: async (username: string, password: string, email: string) => {
    await conn.query(
      `INSERT INTO owner (username, password, email) VALUES ('${username}', '${password}', '${email}')`
    );
    const [rows] = await conn.query(
      `SELECT * FROM owner WHERE username = '${username}'`
    );
    return rows[0];
  },
  createProduct: async (name: string, pictures: string, owner_id: string) => {
    await conn.query(
      `INSERT INTO product (name, pictures, owner_id) VALUES ('${name}', '${pictures}', '${owner_id}')`
    );
    const [rows] = await conn.query(
      `SELECT * FROM product WHERE name = '${name}'`
    );
    return rows[0];
  },
  allProduct: async (owner_id: string) => {
    const [rows] = await conn.query(
      `SELECT * FROM product WHERE owner_id = ${owner_id}`
    );
    return rows;
  },
  findSingleProduct: async (value: string, key: string) => {
    const [rows] = await conn.query(
      `SELECT * FROM product WHERE ${key} = '${value}'`
    );
    return rows[0];
  },
  editProduct: async (id: number, name: string, url?: string) => {
    await conn.query(`UPDATE product SET name = '${name}' ${
      url ? `, pictures = ${url}` : ""
    } 
    WHERE id = ${id};`);
    const [rows] = await conn.query(
      `SELECT * FROM product WHERE name = '${name}'`
    );
    return rows[0];
  },
  deleteProduct: async (id: number) => {
    await conn.query(`DELETE FROM product WHERE id = ${id}`);
  },
};
