const jwt = require("jwt-simple");
const moment = require("moment");
const libjwt = require("../services/generateJWT");
const secretKey = libjwt.secretKey;

// Middleware de autenticación
exports.auth = (req, res, next) => {
    // comprobamos que la solicitud tenga el encabezado de "authorization"
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        })
    };
    // quitar la palabra Bearer del token
    const token = req.headers.authorization.replace("Bearer ", '');
    // decodificamos el token
    try {
        const payload = jwt.decode(token, secretKey);
        // comprobar que el token no haya expirado
        if(payload.exp <= moment().unix()){                       
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            })
        };   
        // agregar los datos del usuario al body de cada request
        req.user = payload;  
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "Token inválido"
        })
    }
    // pasar a ejecutar la siguiente acción, que sería el controlador sobre el que se está aplicando este middleware
    next();
}