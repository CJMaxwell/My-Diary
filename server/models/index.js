// https://node-postgres.com/guides/project-structure

import { Pool } from 'pg';

const pool = new Pool();

export default {
  query: (sql, params, callback) => pool.query(sql, params, callback),
};
