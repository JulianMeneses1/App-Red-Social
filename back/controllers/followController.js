const Follow = require("../models/Follow");
const User = require("../models/User");

const follow = (req, res) => {
    const params = req.body;
    const identity = req.user;

    if (!params.followed) {
        return res.status(400).send({
            status: "error",
            message: "Petición inválida, no se ha ingresado el usuario a seguir"
        })
    };

    User.findById(params.followed)
        .then(() => {
            let userToFollow = new Follow({
                user: identity.id,
                followed: params.followed
            });
            userToFollow.save()
                .then((followStored) => {
                    return res.status(200).send({
                        status: "success",
                        message: "Seguir usuario confirmado",
                        identity,
                        follow: followStored
                    })
                }).catch((error) => {
                    return res.status(500).send({
                        status: "internal server error",
                        message: "No se ha podido seguir al usuario"
                    })
                })
        }).catch((error) => {
            return res.status(404).send({
                status: "error",
                message: "El usuario a seguir no existe",
            })
        })
}

const unfollow = (req, res) => {
    const followedId = req.params.id;
    const userId = req.user.id;

    Follow.findOneAndDelete({
        user: userId,
        followed: followedId
    }).then((userToUnfollow) => {
        if (!userToUnfollow) {
            return res.status(400).send({
                status: "error",
                message: "El usuario no es seguido actualmente"
            })
        }
        return res.status(200).send({
            status: "success",
            message: "Dejar de seguir usuario confirmado",
            userToUnfollow
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "No se ha podido dejar de seguir al usuario"
        })
    })
}

// Lista de usuarios que un usuario sigue
const following = (req, res) => {
    // obtenemos el id del usuario autenticado
    let userId = req.user.id;
    // si recibimos un id por params, entonces actualizamos el userId, porque vamos a buscar los usuarios que sigue otro usuario, no el que está autenticado.
    // si no se pasa un id por params, entonces se buscan los usuarios que sigue el usuario autenticado.
    if (req.params.id) userId = req.params.id;
    const page = req.params.page ? req.params.page : 1;
    // el método populate lo que hace es "relacionar" dos colecciones a partir de un id, en este caso a través del id de los campos user y followed se accede a 
    // los respectivos registros con ese id en la colección user, pudiendo mostrar sus datos. Y con el - decimos qué campos no debe traer en el resultado
    Follow.paginate({user: userId}, {page, limit: 3, sort: { created_at: 1 }, 
        populate: [
            { path: "user", select: "-password -role -__v" },
            { path: "followed", select: "-password -role -__v" }
        ]})
        .then((follows)=>{
            // aplicamos un reduce para evitar que el usuario que sigue se repita en cada objeto, mostrándose una sola vez y en un array todos los usuarios que está siguiendo
            follows.docs = follows.docs.reduce((result, follow) => {
                // Si el usuario que sigue aún no está en el array (result), lo agregamos (lo que va a ocurrir una sola vez)
                if (!result.some((item) => item.user._id === follow.user._id)) {
                    result.push({
                        user: follow.user,
                        followed: [follow.followed]
                    });
                } else {
                    // Si el usuario que sigue ya está en el array (result), lo cual va a ocurrir siempre después del primer item, solo agregamos el followed a su lista,
                    // es decir el usuario que está siguiendo
                    const existingUser = result.find((item) => item.user._id === follow.user._id);
                    existingUser.followed.push(follow.followed);
                }
                // retornamos el array modificado
                return result;
            }, []);            
            return res.status(200).send({
                status: "success",
                follows
            })
        }).catch((error)=>{
            return res.status(500).send({
                status: "internal error server",
                message: "Error al ejecutar la consulta"
            })
        })           
}

// Lista de usuarios que siguen a un usuario
const followers = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Listado de usuarios que me están siguiendo",
        userToUnfollow
    })
}

module.exports = {
    follow,
    unfollow,
    following,
    followers
}