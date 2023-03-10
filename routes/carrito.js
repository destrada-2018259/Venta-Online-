const {Router} = require('express');
const { getCarrito, postCarrito, agregarAlCarrito } = require('../controllers/carrito');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getCarrito);

router.put('/agregarproducto/:idCarrito',[
    validarJWT
], agregarAlCarrito);

router.post('/agregar',[
    validarJWT
], postCarrito);

module.exports = router;