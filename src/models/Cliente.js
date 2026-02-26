const { DataTypes } = require('sequelize');
const db = require('../config/db')

module.exports = db.define('Cliente', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    dependencia: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {tableName: 'clientes' });