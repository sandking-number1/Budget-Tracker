let express = require('express');
let cors = require('cors');
let morgan = require('morgan');
const connectDb = require('./config/connectDb');
let userRoute = require('./routes/userRoute');
const incomeRoute = require('./routes/incomeRoute');
const expenseRoute = require('./routes/expenseRoute');
const savingsRoute = require('./routes/savingsRoute');


connectDb()
let app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());


app.use("/users", userRoute)
app.use("/income", incomeRoute)
app.use("/expense", expenseRoute)
app.use("/savings", savingsRoute)


let port = 8080

app.listen(port, () => {
    console.log(` Server running on:${port}`)
})