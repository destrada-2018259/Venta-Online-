const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request header'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        const user = await User.findById( uid );
        if ( !user ) {
            return res.status(401).json({
                msg: 'not valid Token - User does not exist'
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