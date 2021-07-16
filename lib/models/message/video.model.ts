import { Model, DataTypes } from "sequelize";
import { database } from "../../config/database";
import { IContent, Message } from "./message.model";

export class Video extends Model implements IContent {
  id: number;
  type: string = "video";
  url: string;
  source: videoSource;
}

type videoSource = "youtube" | "vimeo";

Video.init(
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
    source: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "videos",
    sequelize: database,
  }
);

Video.belongsTo(Message);
Message.hasOne(Video);

Video.sync({ force: true }).then(() => console.log("Videos table created"));
