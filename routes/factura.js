const {Router} = require('express');
const { getFactura, comprar } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getFactura);

router.get('/comprar',[
    validarJWT
], comprar)


module.exports = router