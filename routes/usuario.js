const {Router} = require('express');
const {getUsuario, postUsuario, putUsuario, deleteUsuario, registroUsuario, deleteMyAccount, updateMyAccount} = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getUsuario);
router.post('/agregar',[
    validarJWT,
    esAdminRole
], postUsuario);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole
], putUsuario);

router.put('/editarmicuenta/:id',[
    validarJWT,
], updateMyAccount);

router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole
], deleteUsuario);

router.delete('/eliminarmicuenta/:id',[
    validarJWT,
], deleteMyAccount);

router.post('/register', registroUsuario);

module.exports = router;