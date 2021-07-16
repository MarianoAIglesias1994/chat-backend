import { Model, DataTypes } from "sequelize";
import { database } from "../../config/database";

export class Message extends Model {
  [x: string]: any; // TODO: Remove this attribute
  public id!: number;
  public sender!: number;
  public recipient!: number;
  public contentType!: contentType;
  public content!: IContent;
  public readonly createdAt!: Date;
}

export interface IContent {
  id: number;
  type: string;
}

export type contentType = "text" | "image" | "video";

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    recipient: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    sequelize: database,
  }
);

Message.sync({ force: true }).then(() => console.log("Messages table created"));

export interface MessageInterface {
  sender: number;
  recipient: number;
  contentType: contentType;
  content: IContent;
}
