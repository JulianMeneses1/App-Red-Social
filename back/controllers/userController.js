const { validateUser } = require("../helpers/validationUser");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = (req, res) => {

    const params = req.body;

    try {               
        validateUser(params);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Datos incorrectos"
        })
    } 
    params.email = params.email.toLowerCase();
    params.nick = params.nick.toLowerCase();

    User.find({ $or: [
        {email: params.email},
        {nick: params.nick}
    ]})
    .exec()
    .then(async (users)=> {
        if (users && users.length >= 1) {
            return res.status(500).json({
                status:"internal server error",
                message: "Ya existe un usuario con ese email o nick"
            })
        } 
        const hashPassword = await bcrypt.hash(params.password,10);
        params.password = hashPassword;
        const user = new User(params);
        user.save(user).then(()=> {
            return res.status(200).json({
                status:"success",
                message: "Usuario guardado exitosamente",
                user
            })
        }).catch(error=> {
            return res.status(500).json({
                status:"internal server error",
                message: "Error al guardar el usuario en la bbdd"
            })
        })       
    })        
    .catch((error)=> {
        return res.status(500).json({
            status:"internal server error",
            message: "Error al ejecutar la consulta"
        })
    })
}

module.exports = {
    register
}