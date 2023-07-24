const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secretKey = "SECRET_KEY_SOCIAL_APP_167894asdbsdf52235";

// Generar el token
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), 
        exp: moment().add(1,"days").unix()
    };
    return jwt.encode(payload, secretKey);
}

module.exports = {
    secretKey,
    createToken
}