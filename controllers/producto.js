const {response, request} = require('express');
//Modelos

const Producto = require('../models/producto');

//Get Productos

const getProducto = async (req = request, res = response) => {
    const listaProductos = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
    ])

    res.json({
        msg: 'Get Productos',
        listaProductos
    })
}

const postProducto = async (req = request, res = response) => {
    const {nombre, precio, descripcion, stock, categoria} = req.body;
    const productoDB = new Producto({ nombre, precio, descripcion, stock, categoria});

    await productoDB.save();
    res.status(201).json({
        msg: 'Producto creado',
        producto: productoDB
    })        
}

const putProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;
    
    const ProductoEditado = await Producto.findByIdAndUpdate(id, resto,)
}

const deleteProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE PRODUCTOS',
        productoEliminado
    })
}

module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}

