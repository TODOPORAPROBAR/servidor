const Tareas = require("../models/TASK")

const CtrlTask = {}

//GET
CtrlTask.getTask = async(req, res)=>{
    try {
        const tasks = await Tareas.find({
            active: true
        })

        res.status(200).json({
            msg:"Tareas encontradas",
            tasks
        })

    } catch (error) {
        res.status(400).json({
            msg:"No se encontraron tareas"
        })
    }

}

//GET TASK ID USER
CtrlTask.getTaskIdUser = async(req, res)=>{
    try {
        const idUser = req.user._id
        const tasks = await Tareas.find({
                idUser
            })
            .populate('idUser', ['username', 'password'])

        if (!tasks.length) {
            res.status(404).json({
                msg: "No se encontraron tareas de este usuario"
            })
        }

        res.status(200).json({
            msg:"Tareas del usuario:",
            tasks
        })

    } catch (error) {
        res.status(400).json({
            msg: "No se encontraron tareas"
        })
    }
}

//POST
CtrlTask.postTask = async(req, res)=>{
    try {
        const idUser = req.user._id
        const {title,description,state} = req.body
        if (!idUser || !title || !description || !state){
            res.status(400).json({
                msg:"Informacion incorrecta"
            })
        }

        const newTask = new Tareas({
            idUser,
            title,
            description,
            state
        })
        const tareaRegistrada=await newTask.save()

        res.status(200).json({
            msg:"Tarea registrada con  éxito",
            tareaRegistrada
        })

    } catch (error) {
        res.status(400).json({
            msg:"No se pudo registrar la tarea"
        })
    }
}

//PUT
CtrlTask.putTask =async(req,res)=>{
try {
    const idTarea=req.params.idTask
    const idUser=req.user._id
const{title,description,state}=req.body
if(!idUser||!title||!description||!state){
    res.status(400).json({
        msg:"Información incorrecta"
    })
}
const tarea=await Tareas.findById(idTarea)
const userIdString=idUser.toString()
const tareaIdString=tarea.idUser.toString()
if (!((userIdString === tareaIdString )||req.user.role==='admin_user'))
{
    return res.status(400).json({
        msg:"No tiene autorización para editar la tarea"})
}
await tarea.updateOne({title,description,state})

res.status(200).json({
    msg:"Tarea modificada con éxito"})
}


catch (error) {
    res.status(400).json({
        msg:"Error",
        error:error.message
    })
}
}

//DELETE
CtrlTask.deleteTask = async(req,res)=>{
try {
    const idUser=req.user._id
    const idTarea=req.params.idTask
    const tareas= await Tareas.findOne({$and:[{_id:idTarea},{isActive:true}]})

if (!tareas || !tareas.isActive){
res.status(400).json({
    msg:"No existe la tarea"})

}
    const userIdString=idUser.toString()
const tareaIdString=tareas.idUser.toString()
if (!((userIdString === tareaIdString )||req.usuario.role==='admin_user'))
{
    res.status(400).json({
        msg:"No posee autorización para eliminar esta tarea"})
}
await tareas.updateOne({isActive:false})

res.status(200).json({
    msg:"Tarea eliminada con éxito"})
 
} catch (error) {
    res.status(400).json({
        msg:"Error al eliminar la tarea"
    })
}
}

module.exports = CtrlTask