const router = require('express').Router()
const isAdmin = require('../middlewares/admin')
const validarJWT = require('../middlewares/validarJWT')


const{getTask, getTaskIdUser, postTask, putTask, deleteTask} = require('../controllers/tasks.controllers')

router.get("/task",getTask)
router.get("/task/user",[validarJWT],getTaskIdUser)
router.post("/task",[validarJWT],postTask)
router.put("/task/:idTask",[validarJWT],putTask)
router.delete("/task/:idTask",[validarJWT],deleteTask)

module.exports=router