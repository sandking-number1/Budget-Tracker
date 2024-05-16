let Inc = require("../models/income")
let expressAsync = require("express-async-handler")
let moment = require("moment")

let addIncome = expressAsync(async (req, res) => {
    let { user_id, date, category, description, amount, payment_method } = req?.body
    try {
        let income = await Inc.create({ user_id, date, category, description, amount, payment_method })
        res.status(200).json(income)
    }
    catch (err) {
        res.json(err)
    }
})

let fetchAllIncome = expressAsync(async (req, res) => {
    try {
        const {filter, incomeCategory, incomePayment, Amount} = req.body
        let income = await Inc.find({user_id:req.body.user_id,
        ...(incomeCategory !== "all" && {category: incomeCategory}),
        ...(Amount !== "all" && { amount: { $lte: Amount } }),
        ...(incomePayment !== "all" && {payment_method: incomePayment}),
        ...(filter !== "all" && {date: {$gt: moment().subtract(Number(filter), 'd').toDate()}})
    })
        res.status(200).json(income)
    }
    catch (err) {
        res.json(err)
    }
})

let updateIncome = expressAsync(async (req, res) => {
    try {
        let income = await Inc.findOneAndUpdate({_id: req.body.income_id}, req.body.income)
        res.status(200).json(income)
    }
    catch (err) {
        res.json(err)
    }
})

let deleteIncome = expressAsync(async (req, res) => {
    try {
        let income = await Inc.findOneAndDelete({_id: req.body.income_id})
        res.status(200).json(income)
    }
    catch (err) {
        res.json(err)
    }
})


module.exports = { addIncome, fetchAllIncome, updateIncome, deleteIncome }