const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Usuario', UsuarioSchema);