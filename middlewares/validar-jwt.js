const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en el header de la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        const user = await User.findById( uid );
        if ( !user ) {
            return res.status(401).json({
                msg: 'el token no es valido - El usuario no existe'
            });
        }

        req.user = user;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Not valid Token'

        })
    }

}


module.exports = {
    validarJWT
}