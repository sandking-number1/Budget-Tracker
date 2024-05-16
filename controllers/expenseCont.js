let Exp = require("../models/expense")
let expressAsync = require("express-async-handler")
let moment = require("moment")

let addExpense = expressAsync(async(req, res) => {
    let {user_id, date, category, description, amount, payment_method} = req?.body
    try{
        let expense = await Exp.create({user_id, date, category, description, amount, payment_method})
        res.status(200).json(expense)
    }
    catch(err){
        res.json(err)
    }
})

let fetchAllExpense = expressAsync(async(req, res) => {
    try {
        const {filter, expenseCategory, expensePayment, Amount} = req.body
        let expense = await Exp.find({user_id:req.body.user_id,
            ...(expenseCategory !== "all" && {category: expenseCategory}),
            ...(expensePayment !== "all" && {payment_method: expensePayment}),
            ...(Amount !== "all" && { amount: { $lte: Amount } }),
            ...(filter !== "all" && {date: {$gt: moment().subtract(Number(filter), 'd').toDate()}}), user_id:req.body.user_id})
        res.json(expense);
    }
    catch(err) {
        res.json(err);
    }
})

let updateExpense = expressAsync(async(req, res) =>{
    try {
        let expense = await Exp.findByIdAndUpdate({_id: req.body.expense_id}, req.body.expense)
        res.status(200).json(expense)
    }
    catch (err) {
        res.json(err)
    }
})

let deleteExpense = expressAsync(async(req, res) =>{
    try {
        let expense = await Exp.findOneAndDelete({_id: req.body.expense_id})
        res.status(200).json(expense)
    }
    catch (err) {
        res.json(err)
    }
})


module.exports = {addExpense, fetchAllExpense, updateExpense, deleteExpense}