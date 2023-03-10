const {response, request} = require('express');
const Usuario = require('../models/usuario');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const getCarrito = async (req = request, res = response) => {
    const carrito = await Promise.all([
        Carrito.countDocuments(),
        Carrito.find().populate('usuario', 'nombre')
    ])

    res.json({
        msg: 'carritos encontrados',
        carrito
    })
}
//crear carrito vacio
const postCarrito = async (req = request, res = response) => {

    const usuario = req.user._id;

    const carritoExiste = await Carrito.findOne({usuario: usuario});
    if (carritoExiste) {
        return res.status(400).json({
            msg: 'El usuario ya tiene un carrito'
        })
        
    }
    const producto = [];
    const carritoDb = new Carrito({usuario, producto});
    await carritoDb.save();

    res.status(201).json({
        msg: 'carrito creado',
        carritoDb
    });
}

const agregarAlCarrito = async (req = request, res = response) => {
    const {idProducto} = req.params;
    const usuario = req.user._id;
    

    const producto = await Producto.findOne(idProducto);
    const carritoCoincide = await Carrito.findOne({usuario: usuario});

    let subtotalCarrito = carritoCoincide.subtotal + producto.precio;

    if (!carritoCoincide) {
        return res.status(400).json({
            msg: 'No tienes un carrito, o estas intentando agregar al carrito de alguien mas'
        })
    }

    const carritoActualizado = await Carrito.findOneAndUpdate(
        {_id: carritoCoincide._id},
        {$push: {'producto': producto},
        subtotal: subtotalCarrito},
        {new: true}
    );
    res.json({
        msg: 'carrito actualizado',
        carritoActualizado
    })

}

module.exports = {
    getCarrito,
    postCarrito,
    agregarAlCarrito
}