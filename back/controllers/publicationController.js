const Publication = require("../models/Publication");
const { validatePublication } = require("../helpers/validationPublication");
const followService = require("../services/followService");

const save = (req, res) => {

    const params = req.body;

    try {
        validatePublication(params);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "El campo text es obligatorio y debe tener entre 20 y 1000 caracteres"
        })
    }
    const publication = new Publication(params);
    publication.user = req.user.id;

    publication.save(publication).then(() => {
        return res.status(200).json({
            status: "success",
            message: "Publicación creada exitosamente",
            publication
        })
    }).catch((error) => {
        return res.status(500).json({
            status: "internal server error",
            message: "Error al crear la publicación"
        })
    })
}

const remove = (req, res) => {
    const id = req.params.id;

    Publication.findOneAndDelete({
        _id: id,
        user: req.user.id
    }).then((publication) => {
        if (!publication) {
            return res.status(400).send({
                status: "error",
                message: "No existe una publicación con ese id o no tienes permiso para borrarla"
            })
        }
        return res.status(200).send({
            status: "success",
            message: "Publicación eliminada",
            publication
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "No se ha podido eliminar la publicación"
        })
    })
}

const getPublication = (req, res) => {
    const id = req.params.id;
    Publication.findById(id)
        .then((publication) => {
            return res.status(200).send({
                status: "success",
                publication
            })
        })
        .catch((error) => {
            return res.status(404).send({
                status: "error",
                message: "No existe una publicación con ese id",
            })
        })
}

// obtener las publicaciones de un usuario determinado
const getUserPublications = (req, res) => {
    const page = req.params.page ? req.params.page : 1;
    const id = req.params.id ? req.params.id : req.user.id;

    Publication.paginate({ user: id }, { page, limit: 3, sort: { created_at: -1 } })
        .then((result) => {
            if (result.docs.length === 0 && page == 1) {
                return res.status(404).json({
                    status: "error",
                    message: "El usuario no posee publicaciones"
                })
            }
            return res.status(200).send({
                result
            })
        }).catch((error) => {
            return res.status(500).json({
                status: "internal server error",
                message: "Error al ejecutar la consulta"
            })
        })
}

// obtener las publicaciones de todos los usuarios a los que sigo
const feed = async (req, res) => {

    const page = req.params.page ? req.params.page : 1;

    try {
        const myFollows = await followService.followUserIds(req.user.id);
        Publication.paginate(
            // trae todas las publicaciones en donde el user esté incluido en el array con los ids de los usuarios a los que sigue el usuario autenticado
            { user: { "$in": myFollows.following } }, {
            page, limit: 3, sort: { created_at: -1 },
            populate: [
                { path: "user", select: "-password -role -__v -created_at -email" }
            ]
        }).then((result) => {
            if (result.docs.length === 0 && page == 1) {
                return res.status(404).json({
                    status: "not found",
                    message: "No hay publicaciones para mostrar"
                })
            }
            return res.status(200).send({
                following: myFollows.following,
                result
            })
        }).catch((error) => {
            return res.status(500).json({
                status: "internal server error",
                message: "Error al ejecutar la consulta"
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: "internal server error",
            message: "Error al obtener los seguidos del usuario"
        })
    }
}

const update = (req, res) => {

    const publicationId = req.params.id;
    const publicationToUpdate = req.body;
    delete publicationToUpdate.user;

    try {
        validatePublication(publicationToUpdate);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "El campo text es obligatorio y debe tener entre 20 y 1000 caracteres"
        })
    }
    Publication.findOneAndUpdate({ _id: publicationId, user: req.user.id }, publicationToUpdate, { new: true })
        .then((publication) => {
            if (!publication) {
                return res.status(400).send({
                    status: "error",
                    message: "No existe una publicación con ese id o no tienes permiso para modificarla"
                })
            }
            return res.status(200).send({
                status: "success",
                message: "Publicación actualizada exitosamente",
                publication
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: "internal server error",
                message: "Error al actualizar la publicación"
            })
        })
}

module.exports = {
    save,
    remove,
    update,
    getPublication,
    getUserPublications,
    feed
}