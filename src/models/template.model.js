const {Schema,model} = require('mongoose')

const TemplateSchema = new Schema({

  name: {
    type: Schema.Types.String,
  },
  tasks: []

}, {
    versionKey: false,
    timestamps: true
})


module.exports = model("template", TemplateSchema)