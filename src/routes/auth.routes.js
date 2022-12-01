const router = require('express').Router()

const {iniciarSesion}=require("../controllers/auth.user")

router.post("/login",iniciarSesion)




module.exports=router;