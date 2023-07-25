const validator = require("validator");

const validatePublication = (publication) => {    
    let validateText = !validator.isEmpty(publication.text) && validator.isLength(publication.text, {min: 20, max: 1000});

    if (!validateText ) {
        throw new Error("Campo text inválido");
    }   
}

module.exports = {
    validatePublication
}