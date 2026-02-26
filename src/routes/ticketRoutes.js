const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');

// POST /api/tickets -> Crear nuevo ticket
router.post('/', ticketController.crearTicket);

// GET /api/tickets -> Ver todos los tickets con sus detalles
router.get('/', ticketController.listarTickets);

module.exports = router;