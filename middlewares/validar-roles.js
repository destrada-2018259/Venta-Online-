const {request, response} = require('express');
const esAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Antes de validar tu rol, debes estar logueado'
        })
    }

    const {rol, nombre} = req.user
    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Solo el admin puede acceder a esta ruta.'
        })
    }

    next();
}

const esClienteRole = (req = request, res = response) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Antes de validar tu rol, debes estar logueado.'
        })
    }

    const {rol, nombre} = req.user
    if (rol === 'CLIENTE_ROLE') {
        return res.status(200).json({
            msg: 'Eres un cliente'
        })
    }

    next();
}
module.exports = {
    esAdminRole,
    esClienteRole
}