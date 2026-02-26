const { DataTypes } = require('sequelize');
const db = require('../config/db')

module.exports = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {tableName: 'usuarios', timestamps: false });