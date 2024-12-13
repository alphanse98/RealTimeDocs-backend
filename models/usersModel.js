const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, // You can also use DataTypes.UUID if you want a UUID as the primary key
        primaryKey: true,
        autoIncrement: true, // This ensures the id is auto-incremented
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Sequelize will manage createdAt and updatedAt
    underscored: false, // Use snake_case for column names if needed
});

module.exports = User;