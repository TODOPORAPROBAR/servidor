const { Schema, model } = require("mongoose");

const TemplateSchema = new Schema(
  {
    title: Schema.Types.String,
    description: Schema.Types.String,
    tasks: [
      {
        description: Schema.Types.String,
        checked: {
          type: Schema.Types.Boolean,
          default: false,
        },
      },
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("template", TemplateSchema);
