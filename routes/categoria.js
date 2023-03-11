const { Router } = require('express');
const { getCategoria, postCategoria, putCategoria, deleteCategoria, getCategoriaById } = require('../controllers/categoria');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategoria);
router.post('/agregar',[
    validarJWT,
    esAdminRole
], postCategoria);
router.put('/editar/:id',[
    validarJWT,
    esAdminRole
], putCategoria);
router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole
], deleteCategoria);
router.get('/mostrar/:id', getCategoriaById);

module.exports = router;
