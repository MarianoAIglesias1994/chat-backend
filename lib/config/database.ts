import { Sequelize } from "sequelize";

export const database = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite3",
});

// TODO: Add credentials for DB
// TODO: Add envs (dev, test, prod) for DB, like :memory or ./db/db.sqlite3
