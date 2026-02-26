const Ticket = require('../models/Ticket');
const Cliente = require('../models/Cliente');
const Tecnico = require('../models/Tecnico');

// 1. Crear un Ticket (Asociar Cliente y Técnico)
const crearTicket = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_tecnico } = req.body;

        const cliente = await Cliente.findByPk(id_cliente);
        const tecnico = await Tecnico.findByPk(id_tecnico);

        if (!cliente || !tecnico) {
            return res.status(404).json({ message: "Cliente o Técnico no encontrado" });
        }

        const nuevoTicket = await Ticket.create({
            codigo,
            descripcion,
            id_cliente,
            id_tecnico
        });

        res.status(201).json({
            message: "Ticket de asistencia registrado",
            data: nuevoTicket
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear ticket", error: error.message });
    }
};

// 2. Listar Tickets con información completa (JOIN)
const listarTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                { model: Cliente, attributes: ['nombre', 'apellido', 'cedula'] },
                { model: Tecnico, attributes: ['nombre', 'apellido'] }
            ]
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tickets" });
    }
};

module.exports = { 
    crearTicket, 
    listarTickets 
};