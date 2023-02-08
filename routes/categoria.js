const { Router } = require('express');
const { getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');

const router = Router();

router.get('/mostrar', getCategoria);
router.post('/agregar', postCategoria);
router.put('/editar/:id', putCategoria);
router.delete('/eliminar/:id', deleteCategoria);

module.exports = router;
