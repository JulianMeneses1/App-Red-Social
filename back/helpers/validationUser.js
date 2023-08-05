const validator = require("validator");

const validateUser = (user) => {    
    let validateName = !validator.isEmpty(user.name) && validator.isLength(user.name, {min: 3, max: 20});
    let validateUsername = !validator.isEmpty(user.username) && validator.isLength(user.username, {min: 4, max: 20});
    let validateEmail = !validator.isEmpty(user.email) && validator.isEmail(user.email);
    let validateBiography = validator.isLength(user.biography, {min: 20, max: 250});
    let validatePassword = !validator.isEmpty(user.password) && validator.matches(user.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/);

    if (!validateName || !validateUsername  || !validateEmail || !validatePassword || !validateBiography) {
        throw new Error("Campos inválidos");
    }   
}

module.exports = {
    validateUser
}