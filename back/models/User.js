const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-pagination");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: String,
    nick: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "role_user"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    }
})


module.exports = model("User", UserSchema)