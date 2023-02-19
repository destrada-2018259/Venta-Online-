const {Router} = require('express');
const {getProducto, postProducto, putProducto, deleteProducto} = require('../controllers/producto');

const router = Router();

router.get('/mostrar', getProducto);
router.post('/agregar', postProducto);
router.put('/editar/:id', putProducto);
router.delete('/eliminar/:id', deleteProducto);

module.exports = router;