const { Schema, model } = require('mongoose');

const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, 
    fecha:{
        type: Date,
        required: true,
        default: Date()
    },
    total: {
        type: Number,
        default: 0
    },
    detalle:{
        type: Array,
        default: []
    }
});

module.exports = model('Factura', FacturaSchema);