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

const registroUsuario = async (req = request, res = response) => {
    const {nombre, email, password} = req.body;
    const usuarioRegistrado = new Usuario({nombre, email, password});
    const salt = bcryptjs.genSaltSync();
    usuarioRegistrado.password = bcryptjs.hashSync(password, salt);
    
    await usuarioRegistrado.save();

    res.status(201).json({
        msg: 'Nuevo cliente registrado',
        usuarioRegistrado
        
    })
    

}

const deleteMyAccount = async(req = request, res = response) => {
    const {id} = req.params;
    const usuarioId = req.user._id;

    if(id === usuarioId){
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    } else{
        return res.status(401).json({
            msg: 'No tienes permiso para eliminar este usuario'
        })
    }

}

const updateMyAccount = async(req = request, res = response) => {
    const {id} = req.params;
    const usuarioId = req.user._id;
    if(id === usuarioId){
        const {_id, estado, rol, ...resto} = req.body;

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
    
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
        res.json({
            msg: 'Usuario editado',
            usuarioEditado
        })
    } else{
        return res.status(401).json({
            msg: 'No tienes permiso para editar este usuario'
        })
    }
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    registroUsuario,
    deleteMyAccount,
    updateMyAccount
    
}
