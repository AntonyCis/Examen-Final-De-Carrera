const express = require('express');
const router = express.Router();
const tecnicoController = require('../controller/tecnicoController');

router.get('/', tecnicoController.listarTecnicos);
router.post('/', tecnicoController.crearTecnico);
router.put('/:id', tecnicoController.actualizarTecnico);
router.delete('/:id', tecnicoController.eliminarTecnico);

module.exports = router;