let express = require('express')
const { addIncome, fetchAllIncome, updateIncome, deleteIncome } = require('../controllers/incomeCont')

let incomeRoute = express.Router()
incomeRoute.post("/", addIncome)
incomeRoute.post("/fetchAllIncome", fetchAllIncome)
incomeRoute.post("/updateIncome", updateIncome)
incomeRoute.post("/deleteIncome", deleteIncome)

module.exports = incomeRoute
