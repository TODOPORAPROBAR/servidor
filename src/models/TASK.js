const {Schema,model, SchemaType} = require('mongoose')

const TaskSchema = new Schema({

    title: {
        type: Schema.Types.String,
        min: 8,
        require
    },
    descripcion: {
        type: Schema.Types.String,
        min: 8,
        require
    },
    state: {
        type: Schema.Types.String,
        min: 8,
        require
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true

    },
    role: {
        type: Schema.Types.String,
        default:'default_user'
    },

    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    }

}, {
    versionKey: false,
    timestamps: true

})


module.exports = model('tarea', TaskSchema)