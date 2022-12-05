const { Schema, model } = require('mongoose')
const tarea = require('./TASK')

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
  habits: [{
    title: Schema.Types.String,
    description: Schema.Types.String,
    tasks: [{
      description: Schema.Types.String,
      checked: {
        type: Schema.Types.Boolean,
        default: false
      }
    }],
    isTemplate: {
      type: Schema.Types.Boolean,
      default: false
    }
  }],
  isActive: {
    type: Schema.Types.Boolean,
    default: true
  },
  role: {
    type: Schema.Types.String,
    default: 'default_user'
  }
}, {
  versionKey: false,
  timestamps: true
})


module.exports = model("usuario", UserSchema)