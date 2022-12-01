const {Schema,model} = require('mongoose')

const UserSchema = new Schema({

    username: {
        type: Schema.Types.String,
        min: 4,
        required: true
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String,
        min: 6,
        required: true
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true
    },
    role: {
        type: Schema.Types.String,
        default:'default_user'
    }
}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("usuario", UserSchema)