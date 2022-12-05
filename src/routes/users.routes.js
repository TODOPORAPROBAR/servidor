const router = require('express').Router()

const { getUser, postUser, putUser, deleteUser, getUserId } = require("../controllers/users.controllers")
const isAdmin = require("../middlewares/admin")
const validarJWT = require("../middlewares/validarJWT")



router.post("/user", postUser)
// router.get("/user", [validarJWT], getUser)
router.get("/user", getUser)
router.get("/user/:idUser", getUserId)
router.put("/user/:idUser", [validarJWT], putUser)
router.delete("/user", [], deleteUser)//sorry, me falta la validación del token :(


module.exports = router