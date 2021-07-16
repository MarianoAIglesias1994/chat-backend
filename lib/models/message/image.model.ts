import { Model, DataTypes } from "sequelize";
import { database } from "../../config/database";
import { IContent, Message } from "./message.model";

export class Image extends Model implements IContent {
  id: number;
  type: string = "image";
  url: string;
  height: number;
  width: number;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "images",
    sequelize: database,
  }
);

Image.belongsTo(Message);
Message.hasOne(Image);

Image.sync({ force: true }).then(() => console.log("Images table created"));
