const {Router} = require('express');
const {getProducto, postProducto, putProducto, deleteProducto, getMasVendidos, getAgotados, getProductoPorId} = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getProducto);

router.get('/masvendidos', getMasVendidos)

router.get('/agotados', getAgotados)

router.get('mostrar/:id', getProductoPorId)

router.post('/agregar',[
    validarJWT
], postProducto);

router.put('/editar/:id',[
    validarJWT
], putProducto);

router.delete('/eliminar/:id',[
    validarJWT
], deleteProducto);

module.exports = router;