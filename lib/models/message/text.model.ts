import { Model, DataTypes } from "sequelize";
import { database } from "../../config/database";
import { contentType, IContent, Message } from "./message.model";

export class Text extends Model implements IContent {
  id: number;
  type: contentType = "text";
  text: string;
}

Text.init(
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
    text: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "texts",
    sequelize: database,
  }
);

Text.belongsTo(Message);
Message.hasOne(Text);

Text.sync({ force: true }).then(() => console.log("Texts table created"));
