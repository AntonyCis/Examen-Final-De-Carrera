const Cliente = require('../models/Cliente');

//Obtener Clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes'});
    }
};

//Crear clientes
const crearCliente = async (req, res) => {
    try {
        const nuevo = await Cliente.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ message: "Error al crear clientes"});
    }
};

//Actualizar CLientes
const actuaizarCliente = async (req,res) => {
    try{
        const { id } = req.params;
        await Cliente.update(req.body, {where: {id} });
        res.json({ message: "Cliente actualizado con exito"});
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente" });
    }
};

//Eliminar CLientes
const eliminarCliente = async (req,res) => {
    try {
        const {id} = req.params;
        await Cliente.destroy({where: {id}});
        res.json({ message: "Cliente eliminado"})
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente"})
    }
}

module.exports = {
    listarClientes,
    crearCliente,
    actuaizarCliente,
    eliminarCliente
};