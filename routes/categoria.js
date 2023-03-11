const { Router } = require('express');
const { getCategoria, postCategoria, putCategoria, deleteCategoria, getCategoriaById } = require('../controllers/categoria');

const router = Router();

router.get('/mostrar', getCategoria);
router.post('/agregar', postCategoria);
router.put('/editar/:id', putCategoria);
router.delete('/eliminar/:id', deleteCategoria);
router.get('/mostrar/:id', getCategoriaById);

module.exports = router;
