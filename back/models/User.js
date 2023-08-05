const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: String,
    biography: String,
    username: {
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

UserSchema.plugin(mongoosePaginate)
module.exports = model("User", UserSchema)