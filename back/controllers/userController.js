const { validateUser } = require("../helpers/validationUser");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwtService");
const followService = require("../services/followService");
const Publication = require("../models/Publication");
const Follow = require("../models/Follow");

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
    params.username = params.username.toLowerCase();

    User.find({ $or: [
        {email: params.email},
        {username: params.username}
    ]})
    .exec()
    .then(async (users)=> {
        if (users && users.length >= 1) {
            return res.status(500).json({
                status:"internal server error",
                message: "Ya existe un usuario con ese email o username"
            })
        } 
        const hashPassword = await bcrypt.hash(params.password,10);
        params.password = hashPassword;
        const user = new User(params);
        user.save(user).then(()=> {
            return res.status(200).send(user)
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
            message: "Error al comprobar campos únicos"
        })
    })
}

const login = (req, res) => {

    const params = req.body;

    if(!params.email || !params.password){
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    User.findOne({email: params.email.toLowerCase()})  
        .then(user=> {
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "El usuario ingresado no existe"
                })
            }
            // comparamos la contraseña ingresada con la guardada en la bbdd (devuelve true o false)
            const pwd = bcrypt.compareSync(params.password, user.password);

            if (!pwd) {
                return res.status(400).send({
                    status:"error",
                    message: "Contraseña incorrecta",
                })
            }
            
            const token = jwtService.createToken(user);

            return res.status(200).json({
                status:"success",
                message: "Login exitoso",
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username
                },
                token
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: "internal server error",
                message: "Error al ejecutar la consulta"
            })
        })  
}

const profile = (req,res) => {
    const id = req.params.id ? req.params.id : req.user.id;
    User.findById(id)
        .select({password:0, role:0})
        .exec()
        .then(async (userProfile)=>{  
            
            const followInfo = await followService.followThisUser(req.user.id, id);
            return res.status(200).send({
                status: "success",
                user: userProfile,
                // si lo sigo
                following: followInfo.following,
                // si me sigue
                follower: followInfo.follower
            })
        })
        .catch((error)=>{
            return res.status(404).send({
                status:"error",
                message: "No existe un usuario en la bbdd con ese id",
            })
        })    
}

const listUsers = (req,res) => {
    const page = req.params.page ? req.params.page : 1;

    User.paginate({}, {page, limit: 2, sort: {created_at: 1}, select: "-password -role -__v"})
        .then(async (result)=>{
            if(result.docs.length===0 && page==1){
                return res.status(404).json({
                    status: "error",
                    message: "No hay usuarios actualmente"
                }) 
            }
            const followUserIds = await followService.followUserIds(req.user.id);
            return res.status(200).send({
                result,
                user_following: followUserIds.following,
                user_followers: followUserIds.followers
            })
        }).catch((error)=>{
            return res.status(500).json({
                status: "internal server error",
                message: "Error al ejecutar la consulta"
            })
        })   
}

const update = (req, res) => {

    // el campo user es el que agregamos en la autentificación del token
    const userIdentity = req.user;
    // datos a modificar
    const userToUpdate = req.body;    
    // eliminamos los campos que no queremos que pueda modificar
    delete userToUpdate.role;

    // buscamos en la bbdd si ya existe un usuario con el email y/o username ingresado
    User.find({ $or: [
        {email: userToUpdate.email},
        {username: userToUpdate.username}
    ]})
    .exec()
    .then(async (users)=> {
        let userIsSet = false;
        // si ya existe un usuario con el mismo email y/o username que tenga otro id, es decir que no es el usuario que está haciendo
        // la solicitud, entonces ponemos userIsSet en true y lanzamos el error.
        users.forEach(user => {
            if (user && user._id != userIdentity.id) userIsSet = true;
        });
        if (userIsSet) {
            return res.status(500).json({
                status:"internal server error",
                message: "Ya existe un usuario con ese email o username"
            })
        } 
        if (userToUpdate.password) {
            const hashPassword = await bcrypt.hash(userToUpdate.password,10);
            userToUpdate.password = hashPassword;         
        } else {
            delete userToUpdate.password;
        }
        User.findByIdAndUpdate(userIdentity.id, userToUpdate, {new:true})
            .then((user)=> {
                return res.status(200).send({
                    status: "success",
                    message: "Usuario actualizado exitosamente",
                    user
                })
            })
            .catch((error)=> {
                return res.status(500).json({
                    status:"internal server error",
                    message: "Error al actualizar el usuario"
                })
            })
    })
}

const counters = async (req, res) => {

    const userId = req.params.id ? req.params.id : req.user.id;

    try {

        const numberFollowing = await Follow.count({ "user": userId});
        const numberFollowers = await Follow.count({ "followed": userId});
        const numberPublications = await Publication.count({ "user": userId});

        return res.status(200).send({
            user: {
                id: req.user.id,
                nickname: req.user.username
            },
            numberFollowing,
            numberFollowers,
            numberPublications
        })
    } catch(error) {
        return res.status(500).send({
            status: "internal error server",
            message: "Error al ejecutar alguna de las consultas"
        })
    }
}

module.exports = {
    register,
    login,
    profile,
    listUsers,
    counters,
    update
}