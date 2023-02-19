const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

//Modelo
const Usuario = require('../models/usuario');

const getUsuario = async (req = request, res = response) => {
    //Buscar solo si el usaurio esta activo
    const query = {estado: true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'Usuarios encontrados',
        listaUsuarios
    })
}

const postUsuario = async (req = request, res = response) => {
    const {nombre, email, password, rol} = req.body;
    const usuarioDB = new Usuario({nombre, email, password, rol});

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.status(201).json({
        msg: 'Usuario creado',
        usuarioDB
    })
}

const putUsuario = async (req = request, res = response) =>{
    const {id} = req.params;
    const {_id, estado, rol, ...resto} = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'Usuario editado',
        usuarioEditado
    })
}

const deleteUsuario = async (req = request, res = response) => {
    const {id} = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: 'Usuario eliminado',
        usuarioEliminado
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}
