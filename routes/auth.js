const {Router} = require('express');
const { check } = require('express-validator');

const { loginPost } = require('../controllers/auth');

const {validarCampos} = require('../middlewares');


const router = Router();



router.post('/login',
// middlewares de validacion
[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos
]
, loginPost);


module.exports = router;
