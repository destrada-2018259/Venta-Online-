const {response, request} = require('express');
const Factura = require('../models/factura');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const getFactura = async (req = request, res = response) => {
    const factura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
    ])

    res.json({
        msg: 'Facturas encontradas',
        factura
    })
}

const comprar = async (req = request, res = response) => {
    const usuario = req.user._id;
    const carrito = await Carrito.findOne({usuario: usuario});
    const total = carrito.subtotal;
    const detalle = carrito.producto;
    const facturaDB = new Factura({usuario, total, detalle});

    await facturaDB.save();

    res.status(201).json({
        msg: 'Factura',
        facturaDB
    })
}

module.exports = {
    getFactura,
    comprar
}