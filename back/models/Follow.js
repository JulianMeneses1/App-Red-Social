const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const FollowSchema = Schema({
    // el tipo de dato Schema.ObjectId en conjunto con la referencia (ref) a la tabla User se usa para establecer una especie de relación
    // entre esta colección/modelo y el de User, para que después usando el método populate se pueda acceder a los datos de la colección user
    // desde el campo user de este modelo (sería como el equivalente a una clave foránea en las bases de datos relacionales)
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    followed: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },    
    created_at: {
        type: Date,
        default: Date.now
    }
})

FollowSchema.plugin(mongoosePaginate)
module.exports = model("Follow", FollowSchema)