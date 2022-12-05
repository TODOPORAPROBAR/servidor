const Usuario = require("../models/user.model");
const bcrypt = require("bcrypt");

const CtrlUser = {};

//GET
CtrlUser.getUser = async (req, res) => {
  try {
    const user = await Usuario.find({
      isActive: true,
    });

    if (!user.length) {
      return res.status(400).json({
        msg: "No se encontró ningún usuario",
      });
    }

    return res.status(200).json({
      msg: "Usuarios encontrados",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error",
    });
  }
};

CtrlUser.getUserHabits = async (req, res) => {
  const { habits } = req.user
  return res.status(200).json({
    message: 'Habitos del usuario obtenidos correctamente',
    habits
  })
};

//GET USER ID
CtrlUser.getUserId = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await Usuario.findOne({
      $and: [
        {
          _id: idUser,
        },
        {
          isActive: true,
        },
      ],
    });
    if (user) {
      res.status(200).json({
        msg: "Usuario:",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error:",
      error,
    });
  }
};

//POST
CtrlUser.postUser = async (req, res) => {
  try {
    const { username, email, password, habits } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);

    const newUsuario = new Usuario({
      username,
      email,
      password: newPassword,
      habits,
    });

    const user = await newUsuario.save();

    res.status(200).json({
      msg: "Usuario creado",
      user,
    });
  } catch (error) {
    res.status(400).json({
      msg: "El usuario no fue creado",
      error: error.message,
    });
  }
};

//PUT
CtrlUser.putUser = async (req, res) => {
  const idUser = req.user._id;

  try {
    const { username, email, password, habits } = req.body;
    await Usuario.findByIdAndUpdate(idUser, {
      username,
      email,
      password,
      habits,
    });
    return res.status(200).json({
      msg: "Usuario actualizado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Se ha encontrado un ${error}`,
    });
  }
};

/* //DELETE
CtrlUser.deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await Usuario.findByIdAndUpdate(id, {
            isActive: false
        })

        res.status(200).json({
            msg:"Se ocultó la tarea",
            tareaD
        })

    } catch (error) {

    }
    const tarea = await Tarea.find()

    return res.json({
        message: "tarea eliminada",
        tarea

    })
} */

// Controlador de DeleteUser
CtrlUser.deleteUser = async (req, res) => {
  try {
    const idUser = req.params._id;
    const user = await Usuario.findOne({
      $and: [{ _id: idUser }, { isActive: true }],
    });
    if (!user) {
      return res.status(404).json({
        message: `El usuario ya no existe`,
      });
    }
    // Busco y actualizo el estado de las tareas que es propietarios de las tareas
    await TASK.updateMany(
      { $and: [{ isActive: true }, { idUser }] },
      { isActive: false }
    );
    // Busco y actualizo el estado del usuario a eliminar
    await user.updateOne({ isActive: false });
    return res.status(201).json({
      message: `Usuario eliminado correctamente.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor: ${error.message}` });
  }
};

module.exports = CtrlUser;
