let Sav = require("../models/savings")
let expressAsync = require("express-async-handler")
let moment = require("moment")

let addSavings = expressAsync(async (req, res) => {
    let { user_id, date, category, description, amount } = req?.body
    let user_exist = await Sav.findOne({description: req.body.description})
    if(user_exist){
        throw new Error("Name already exist")
    }
    try {
        let savings = await Sav.create({ user_id, date, category, description, amount })
        res.status(200).json(savings)
    }
    catch (err) {
        res.json(err)
    }
})

let fetchAllSavings = expressAsync(async (req, res) => {
    try {
        const{ filter, Amount} = req.body
        let Savings = await Sav.find({
            ...(Amount !== "all" && { amount: { $lte: Amount } }),
        ...(filter !== "all" && {date: {$gt: moment().subtract(Number(filter), 'd').toDate()}}),
            user_id: req.body.user_id
        })
        res.status(200).json(Savings)
    }
    catch (err) {
        res.json(err)
    }
})

let updateSavings = expressAsync(async (req, res) => {
    try {
        let savings = await Sav.findOneAndUpdate({_id: req.body.savings_id}, req.body.savings)
        res.status(200).json(savings)
    }
    catch (err) {
        res.json(err)
    }
})

let deleteSavings = expressAsync(async (req, res) => {
    try {
        let savings = await Sav.findOneAndDelete({_id: req.body.savings_id})
        res.status(200).json(savings)
    }
    catch (err) {
        res.json(err)
    }
})


module.exports = { addSavings, fetchAllSavings, updateSavings, deleteSavings }