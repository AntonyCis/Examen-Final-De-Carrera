const { DataTypes } = require('sequelize');
const db = require('../config/db');

module.exports = db.define('Ticket', {
    codigo: { type: DataTypes.STRING(20), allowNull: false },
    descripcion: { type: DataTypes.STRING(200) } // Aumenté el tamaño para que sea útil
}, { tableName: 'tickets', timestamps: false });