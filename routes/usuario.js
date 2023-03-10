const {Router} = require('express');
const {getUsuario, postUsuario, putUsuario, deleteUsuario, registroUsuario} = require('../controllers/usuario');

const router = Router();

router.get('/mostrar', getUsuario);
router.post('/agregar', postUsuario);
router.put('/editar/:id', putUsuario);
router.delete('/eliminar/:id', deleteUsuario);
router.post('/register', registroUsuario)
module.exports = router;