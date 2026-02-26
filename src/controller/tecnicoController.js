const Tecnico = require('../models/Tecnico');
const Cliente = require('../models/Tecnico');

//Obtener Clientes
const listarTecnicos = async (req, res) => {
    try {
        const tecnicos = await Tecnico.findAll();
        res.json(tecnicos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tecnicos', error: error.message});
    }
};

//Crear clientes
const crearTecnico = async (req, res) => {
    try {
        const nuevo = await Tecnico.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al crear tecnico", error: error.message});
    }
};

//Actualizar CLientes
const actualizarTecnico = async (req,res) => {
    try{
        const { id } = req.params;
        await Tecnico.update(req.body, {where: {id} });
        res.json({ message: "Tecnico actualizado con exito"});
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el tecnico" });
    }
};

//Eliminar CLientes
const eliminarTecnico = async (req,res) => {
    try {
        const {id} = req.params;
        await Tecnico.destroy({where: {id}});
        res.json({ message: "Tecnico eliminado"})
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el tecnico"})
    }
}

module.exports = {
    listarTecnicos,
    crearTecnico,
    actualizarTecnico,
    eliminarTecnico
};