import client from '../database';
import { Product } from './types/product.types';

export class Product_model {
  async index(): Promise<Product[]> {
    try {
      const cn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await cn.query(sql);
      // console.log(result.rows);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error('error' + error);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM product WHERE id=${id}`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO product (name,price,category) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const _product = result.rows[0];

      conn.release();

      return _product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. ${err}`);
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM product WHERE category='${category}'`;

      const cn = await client.connect();

      const result = await cn.query(sql);

      cn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find product ${category}. Error: ${err}`);
    }
  }
}
