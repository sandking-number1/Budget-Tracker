let express = require('express')
const { addExpense, fetchAllExpense, updateExpense, deleteExpense } = require('../controllers/expenseCont')

let expenseRoute = express.Router()
expenseRoute.post("/", addExpense)
expenseRoute.post("/fetchAllExpense", fetchAllExpense)
expenseRoute.post("/updateExpense", updateExpense)
expenseRoute.post("/deleteExpense", deleteExpense)

module.exports = expenseRoute