//Importacion
const { response, request } = require('express');
const mongoose = require('mongoose');
//Modelos
const Producto = require('../models/producto');

const getProducto = async(req = request, res = response) => {

     //Condición, me busca solo los productos que tengan estado en true
     const query = { estado: true };

     const listaProductos = await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
     ]);
 
     res.json({
         msg: 'GET API de Productos',
         listaProductos
        });
        
    }
    
    const getMasVendidos = async(req = request, res = response) => {
        const query = { estado: true };
        const listaMasVendidos = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query, {vendidos: {$gt: 1}})
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
        ])

        res.json({
            msg: 'Productos mas vendidos',
            listaMasVendidos
        })
    }
    const getAgotados = async(req = request, res = response) => {
        const query = { estado: true };
        const listaAgotados = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query, {vendidos: {$eq: 0}})
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
        ])
        res.json({
            msg: 'Productos agotados',
            listaAgotados
        })
    }
    const getProductoPorId = async(req = request, res = response) => { 
    const { id } = req.params;
    const producto = await Producto.findById( id )
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
    res.json({
        msg: 'categoria por id',
        producto
    })
}


const postProducto = async (req = request, res = response) => {
                                //operador spread
        const { estado, usuario, vendidos, ...body } = req.body;

        //validación si existe un producto en la db
        const productoEnDB = await Producto.findOne( { nombre: body.nombre } );

        if ( productoEnDB ) {
            return res.status(400).json({
                mensajeError: `El producto ${ productoEnDB.nombre } ya existe en la DB`
            });
        }


        //Generar data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.user._id
        }

        const producto = new Producto( data );

        //Guardar en DB
        await producto.save();

        res.status(201).json({
            msg: 'Post Producto',
            producto
        });


}


const putProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    if ( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.user._id; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de producto               // new: true Sirve para enviar el nuevo documento actualizado     
    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Put de producto',
        producto
    });

}


const deleteProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'delete producto',
        productoBorrado
    });

}




module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto,
    getAgotados,
    getMasVendidos,
    getProductoPorId
}