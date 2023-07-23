const fs = require("fs");
const User = require("../models/User");
const path = require("path");

const upload = (req,res) => {

    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición inválida, no hay imagen"
        })
    }
    let imageName = req.file.originalname;
    let imageSplit = imageName.split("\.");
    let imageExtension = imageSplit[1];

    if(imageExtension != "png" && imageExtension != "jpg" && imageExtension != "jpeg" 
        && imageExtension != "gif" && imageExtension != "webp") {
            const filePath = req.file.path;
            fs.unlinkSync(filePath);
            return res.status(400).send({
                status: "error",
                message: "Extensión del fichero inválida"
            })
    }

    User.findByIdAndUpdate(req.user.id, {image: req.file.filename}, {new:true})
        .then((user)=>{
            return res.status(200).send({
                status: "success",
                user,
                file: req.file
            })
        }).catch((error)=>{
            return res.status(500).json({
                status:"internal server error",
                message: "Error al actualizar el campo imagen del usuario"
            })
        })   
}

const getAvatar = (req, res) => {

    const fileName = req.params.filename;

    const filePath = "./files/avatars/" + fileName;
    
    fs.stat(filePath, (error, exists)=>{
        if (exists) {
            // la ruta del archivo que es un string la convertimos a una ruta absoluta con path.resolve
            return res.sendFile(path.resolve(filePath));
        } else{
            return res.status(404).json({
                status: "error", 
                message: "La imagen no existe"
            }) 
        }
    })    
}

module.exports = {
    upload,
    getAvatar
}