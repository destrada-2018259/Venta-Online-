const {Router} = require('express');
const {getProducto, postProducto, putProducto, deleteProducto, getMasVendidos, getAgotados, getProductoPorId} = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getProducto);

router.get('/masvendidos', getMasVendidos)

router.get('/agotados', getAgotados)

router.get('/mostrarporid/:id', getProductoPorId)

router.post('/agregar',[
    validarJWT,
    esAdminRole
], postProducto);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole
], putProducto);

router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole
], deleteProducto);

module.exports = router;