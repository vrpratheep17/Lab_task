import sequelize from "sequelize";

const Schema = sequelize.define("Schema", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskName: {
    type: sequelize.STRING,
    maxLength: 100,
    allowNull: false,
  },
  taskType: {
    type: sequelize.STRING,
    enum: ["Foundation", "Discovery", "Delivery"],
    allowNull: false,
  },
  isCompleted: {
    type: sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
});

export default Schema;
