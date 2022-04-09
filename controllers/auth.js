const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const loginPost = async(req=request, res=response) => {
    
    const { correo, password } = req.body;

    try {

        // verificar si el email existe 
        const usuario = await Usuario.findOne({correo})
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Datos invalidos'
            });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario Inactivo'
            });
        }

        // verificar la password
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password Invalida'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);


        res.status(201).json({
            msg: 'post Login API controller',
            usuario,
            token
        });

    } catch (error) {
        // Nunca deberia suceder este error
        console.log('Error:', error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        });       
    }

}


module.exports = {
    loginPost
}