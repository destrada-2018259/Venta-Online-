const {request, response} = require('express');
const User = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {
        // Verify if the email exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'email is not valid'
            })
        }
        //Verify if the user exists

        if (!user){
            return res.status(202).json({
                msg: 'User not found'
            })
        }
            
        // Verify the password of the user

        //const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: 'password is not valid'

            })
        }

        const token = await generarJWT(user.id);
    
        res.json({
            msg: 'Inicio de sesion completado con exito',
            email,
            password,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Call the admin'
        })
    }

}

module.exports= {
    login
}