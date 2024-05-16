import React from "react";
import { Progress } from "antd"

const Visualisation = ({ allIncome, allExpense, allGoals }) => {
    const totalIncome = allIncome.reduce((acc, curr) => acc + curr.amount, 0)
    const totalExpense = allExpense.reduce((acc, curr) => acc + curr.amount, 0)
    const total = totalIncome + totalExpense;

    const incomeCategory = ["Business", "Housing", "Insurance", "Investment", "Debt"];
    const expenseCategory = ["Housing", "Transportation", "Entertainment", "Personal Care", "Education", "Utilities", "Insurance"]

    const goalsName = []

    for (let i = 0; i < allGoals.length; i++) {
        goalsName.push(allGoals[i].description)
    }

    const calculateGoalReached = (goalAmount, totalIncome, totalExpense) => {
        return (totalIncome - totalExpense >= goalAmount) ? true : false;
    };

    const RenderGoals = () => {
        return goalsName.map(name => {
            const goalAmount = allGoals.filter(
                goal => goal.description === name
            )[0].amount;
            const goalReached = calculateGoalReached(goalAmount, totalIncome, totalExpense);
            return (
                <div className="card">
                    <div className="card-body">
                        <h6><b>Goal Name:</b></h6>
                        <h7>{name}</h7>
                        <h6><b>Goal Amount: </b></h6>
                        <h7>${goalAmount}</h7>
                        <Progress percent={goalReached ? 100 : ((totalIncome - totalExpense) / goalAmount * 100).toFixed(0)} />
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="filter" >
                <h6>No. of transactions: {allIncome.length + allExpense.length}</h6>
                <h6>Income: {allIncome.length}</h6>
                <h6>Expense: {allExpense.length}</h6>
            </div>
            <div className="row m-5 justify-content-center align-items-center my-4">
                <div className="row md-5 justify-content-center">
                    <div className="col-md-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Cashflow: ${total}</h6>
                            </div>
                            <div className="card-body">
                                <h6>Income: ${totalIncome}</h6>
                                <Progress type="circle" percent={((totalIncome / total) * 100).toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} className="mx-2" />
                                <h6>Expense: ${totalExpense}</h6>
                                <Progress type="circle" percent={((totalExpense / total) * 100).toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} className="mx-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h6>Income Category</h6>
                                {
                                    incomeCategory.map((category) => {
                                        const amount = allIncome.filter(
                                            (income) => income.category === category).reduce(
                                                (acc, income) => acc + income.amount, 0)
                                        return (
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6>{category}</h6>
                                                    <Progress percent={((amount / totalIncome) * 100).toFixed(0)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h6>Expense Category</h6>
                                {
                                    expenseCategory.map(category => {
                                        const amount = allExpense.filter(
                                            (expense) => expense.category === category).reduce(
                                                (acc, expense) => acc + expense.amount, 0)
                                        return (
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6>{category}</h6>
                                                    <Progress percent={((amount / totalExpense) * 100).toFixed(0)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h6>No. of goals: {allGoals.length}</h6>
                            </div>
                            <div className="card-body">
                                <RenderGoals />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Visualisation;