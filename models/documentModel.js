const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Document = sequelize.define("Document", {
    id: {
      type: DataTypes.INTEGER, // or use DataTypes.BIGINT for larger numbers
      primaryKey: true,        // Set as the primary key
      autoIncrement: true,     // Automatically increment the id for new entries
      allowNull: false,        // The id can't be null
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    doc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Documents',  // Ensure the table name is correct
    timestamps: true,        // This will automatically add 'createdAt' and 'updatedAt'
  });

module.exports = Document;
