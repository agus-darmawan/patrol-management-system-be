import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";

class User extends Model {}
User.init(
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  name: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  email: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
  },
  password: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  role: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  active: {
   type: DataTypes.BOOLEAN,
   defaultValue: true,
  },
 },
 {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: true,
 },
);

export default User;
