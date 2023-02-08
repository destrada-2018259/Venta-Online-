const {Schema , model} = require('mongoose');

const CategoriaSchema = Schema({
    categoria: {
        type: String, 
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la categoría es obligatoria']
    }
});

module.exports = model('Categoria', CategoriaSchema)