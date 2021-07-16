import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: database,
  }
);

User.sync({ force: true }).then(() => console.log("Users table created"));

export interface UserInterface {
  username: string;
  password: string;
}
