const {Schema,model} = require('mongoose')

const HistorySchema = new Schema({

  user: {
    type: Schema.types.ObjetId,
    ref: "usuario"
  },
  fecha: {
    type: Schema.types.Date,
  },
  habitos: [{
    name: Schema.types.String,
    tasks: [
      {
      description: Schema.types.String,
      checked: Schema.types.Boolean
      }
  ]
}]
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model("history", HistorySchema)