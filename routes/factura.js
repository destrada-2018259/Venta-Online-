const {Router} = require('express');
const { getFactura, comprar } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    esAdminRole
], getFactura);

router.get('/comprar',[
    validarJWT
], comprar)


module.exports = router