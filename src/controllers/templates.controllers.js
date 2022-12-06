const Template = require("../models/templates.model");

const controller = {};

controller.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({});
    return res.status(200).json({
      message: "Templates encontrados",
      templates,
    });
  } catch (error) {
    console.log("get templates error =>", error);
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

controller.addTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    return res.status(200).json({
      message: "Template creado correctamente",
      template,
    });
  } catch (error) {
    console.log("add template error =>", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

module.exports = controller;
