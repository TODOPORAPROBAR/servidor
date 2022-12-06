const { getTemplates, addTemplate } = require('../controllers/templates.controllers')

const router = require('express').Router()

// const validarJWT = require("../middlewares/validarJWT")

router.get("/template", getTemplates)
router.post("/template", addTemplate)


module.exports = router