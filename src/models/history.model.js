const { Schema, model } = require('mongoose')

const HistorySchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "usuario"
  },
  date: {
    type: Schema.Types.Date,
  },
  habits: [{
    title: Schema.Types.String,
    description: Schema.Types.String,
    tasks: [
      {
        description: Schema.Types.String,
        checked: {
          type: Schema.Types.Boolean,
          default: false
        }
      }
    ]
  }]
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model("history", HistorySchema)