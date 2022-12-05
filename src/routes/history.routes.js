const router = require('express').Router()
const { getHistory, getDailyHistory } = require('../controllers/history.controllers')
const validarJWT = require('../middlewares/validarJWT')

router.get("/history", getHistory)
router.get("/history/daily", validarJWT, getDailyHistory)

module.exports = router