const Usuario = require('../models/usuario');
const Role = require("../models/role");


const esRolValido = async (rol = '') => {
    const existeRole = await Role.findOne({rol});
    if (!existeRole){
        throw new Error(`El rol ${rol} no estaba registrado en la BD`);
    }
}

const esCorreoValido = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} estaba registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id not esta registrado en la BD`);
    }
}






module.exports = {
    esRolValido,
    esCorreoValido,
    existeUsuarioPorId
}