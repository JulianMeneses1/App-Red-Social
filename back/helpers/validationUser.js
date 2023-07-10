const validator = require("validator");

const validateUser = (user) => {    
    let validateName = !validator.isEmpty(user.name) && validator.isLength(user.name, {min: 3, max: 20});
    let validateNick = !validator.isEmpty(user.nick) && validator.isLength(user.nick, {min: 4, max: 20});
    let validateEmail = !validator.isEmpty(user.email) && validator.isEmail(user.email);
    let validatePassword = !validator.isEmpty(user.password) && validator.matches(user.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/);

    if (!validateName || !validateNick  || !validateEmail || !validatePassword) {
        throw new Error("Campos inválidos");
    }   
}

module.exports = {
    validateUser
}

// ||  