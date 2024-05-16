let express = require('express')
const { addSavings, fetchAllSavings, updateSavings, deleteSavings } = require('../controllers/savingsCont')

let savingsRoute = express.Router()
savingsRoute.post("/", addSavings)
savingsRoute.post("/fetchAllSavings", fetchAllSavings)
savingsRoute.post("/updateSavings", updateSavings)
savingsRoute.post("/deleteSavings", deleteSavings)

module.exports = savingsRoute