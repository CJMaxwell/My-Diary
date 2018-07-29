import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const createTables = async () => {
  try {
    await models.query('DROP TABLE IF EXISTS diaryEntry');
    await models.query('DROP TABLE IF EXISTS users');

    await models.query(
      `
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `,
    );

    await models.query(
      `
        CREATE TABLE diaryEntry(
          id SERIAL PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          body VARCHAR(255) NOT NULL,
          userid INT NOT NULL,
          createdat TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
          FOREIGN KEY (userid) REFERENCES users(id)
        )
      `,
    );
  } catch (err) {
    console.log(err);
  }
};

createTables();
