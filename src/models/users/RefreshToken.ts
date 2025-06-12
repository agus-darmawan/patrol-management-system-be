import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";

class RefreshToken extends Model {}

RefreshToken.init(
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  userId: {
   type: DataTypes.INTEGER,
   allowNull: false,
   references: {
    model: "users",
    key: "id",
   },
  },
  token: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  expiresAt: {
   type: DataTypes.DATE,
   allowNull: false,
  },
 },
 {
  sequelize,
  modelName: "RefreshToken",
  tableName: "refresh_tokens",
  timestamps: true,
 },
);

export default RefreshToken;
