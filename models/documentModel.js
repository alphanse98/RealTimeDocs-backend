const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Document = sequelize.define("Document", {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,        
      autoIncrement: true,    
      allowNull: false,       
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
