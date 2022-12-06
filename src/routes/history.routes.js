const router = require('express').Router()
const { getHistory, getDailyHistory, updateDailyHistory, deleteDailyHistory } = require('../controllers/history.controllers')
const validarJWT = require('../middlewares/validarJWT')

router.get("/history", getHistory)
router.get("/history/daily", validarJWT, getDailyHistory)
router.put("/history/daily", validarJWT, updateDailyHistory)
router.delete("/history/daily", validarJWT, deleteDailyHistory)

module.exports = router