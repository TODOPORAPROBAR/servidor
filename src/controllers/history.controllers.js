const getFormatDate = require("../helpers/getFormatDate");
const History = require("../models/history.model");

const controller = {};

controller.getHistory = async (req, res) => {
  try {
    const history = await History.find({});
    return res.status(200).json({
      message: "Historial del tareas",
      history,
    });
  } catch (error) {}
};

controller.getDailyHistory = async (req, res) => {
  try {
    const { full } = getFormatDate();
    const { user } = req;
    const findHistory = await History.findOne({ date: full, user: user._id });
    const days = await History.count({user: user._id})
    let history;
    let created = false;

    console.log(user);

    if (findHistory) {
      history = findHistory;
    } else {
      history = new History({
        user: user._id,
        date: full,
        habits: user.habits,
      });
      await history.save();
      created = true;
    }

    return res.status(200).json({
      message: "peticion exitosa",
      history,
      days,
      isNew: created,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};

controller.updateDailyHistory = async (req, res) => {
  try {
    const { full } = getFormatDate();
    const { user } = req;
    const { habits } = req.body;
    const history = await History.findOne({ date: full, user: user._id });
    if (history) {
      history.habits = habits;
      await history.save();
      return res.status(200).json({
        message: "Los datos se guardaron exitosamente",
        history,
      });
    }
    return res.status(400).json({
      message: "No existe un seguimiento diario de los datos",
    });
  } catch (error) {
    console.log("Error al actualizar daily history =>", error);
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

module.exports = controller;
