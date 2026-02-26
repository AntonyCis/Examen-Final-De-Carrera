const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Modelos
const Usuario = require('./models/Usuario');
const Cliente = require('./models/Cliente');
const Tecnico = require('./models/Tecnico');
const Ticket = require('./models/Ticket');

// Rutas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Relaciones N:M
Ticket.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Ticket.belongsTo(Tecnico, { foreignKey: 'id_tecnico' });

// Relación inversa (opcional pero recomendada para reportes)
Cliente.hasMany(Ticket, { foreignKey: 'id_cliente' });
Tecnico.hasMany(Ticket, { foreignKey: 'id_tecnico' });

app.get('/', (req, res) => {
    res.send("Bienvenido al sistema de Asistencia hecho por Antony Cisneros y Ariel Macias!")
});

// Endpoints
app.get('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tecnicos', tecnicoRoutes);
app.use('/api/tickets', ticketRoutes);

async function main() {
    try {
        await db.sync({ force: false });
        console.log('✅ Base de datos de Tickets sincronizada');
        app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));
    } catch (e) {
        console.error(e);
    }
}

main();