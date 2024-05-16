import React, { useState, useEffect } from "react";
import { message, Select, Table, Modal, Form, Input, Button } from "antd";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import Visualisation from "../components/Visualisation";

const Transactions = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [allIncome, setAllIncome] = useState([]);
  const [incomeCategory, setIncomeCategory] = useState("all");
  const [Filter, setFilter] = useState('all');
  const [Amount, setAmount] = useState('all');

  const [incomePayment, setIncomePayment] = useState("all");
  const [updateIncomeData, setUpdateIncomeData] = useState(null);

  const [viewData, setViewData] = useState("table");

  const incomeColumns = [

    { title: "Date", dataIndex: "date", render: (text) => <span>{moment(text).format("MM-DD-YYYY")}</span> },
    { title: "Category", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Payment Method", dataIndex: "payment_method" },
    {
      title: "Action", render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => (
            setUpdateIncomeData(record), setShowModal1(true)
          )}>Edit</Button>
          <Button type="danger" onClick={() => handleIncomeDelete(record)}>Delete</Button>
        </div>
      )
    }
  ];

  const fetchAllIncome = async (Filter, incomeCategory, incomePayment, Amount, setAllIncome) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/income/fetchAllIncome", { user_id: user.id, filter: Filter, incomeCategory, incomePayment, Amount });
      setAllIncome(res.data);
    } catch (err) {
      console.log(err);
      message.error("Incomes could not be fetched");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllIncome(Filter, incomeCategory, incomePayment, Amount, setAllIncome);
    };
    fetchData();
  }, [Filter, incomeCategory, incomePayment, Amount, setAllIncome]);

  const handleModal1Cancel = () => {
    setShowModal1(false);
  };


  const handleIncomeSubmit = async (values) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      await axios.post("/income/updateIncome", {
        income: {
          user_id: user._id,
          ...values
        },
        income_id: updateIncomeData.id
      });
      
      setShowModal1(false);
      setUpdateIncomeData(null);
        window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleIncomeDelete = async (record) => {
    try {
      await axios.post("/income/deleteIncome", { income_id: record._id })
      message.success("Income deleted successfully");
      window.location.reload();
    }
    catch (err) {
      console.log(err);
      message.error("Income could not be deleted");
    }
  }

  const [showModal2, setShowModal2] = useState(false);
  const [allExpense, setAllExpense] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState("all");
  const [updateExpenseData, setUpdateExpenseData] = useState(null);


  const expenseColumns = [

    { title: "Date", dataIndex: "date", render: (text) => <span>{moment(text).format("MM-DD-YYYY")}</span> },
    { title: "Category", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Payment Method", dataIndex: "payment_method" },
    {
      title: "Action", render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => (
            setUpdateExpenseData(record), setShowModal2(true)
          )}>Edit</Button>
          <Button type="danger" onClick={() => handleExpenseDelete(record)}>Delete</Button>
        </div>
      )
    }
  ];

  const fetchAllExpense = async (Filter, expenseCategory, expensePayment, Amount, setAllExpense) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/expense/fetchAllExpense", { user_id: user.id, filter: Filter, expenseCategory, expensePayment, Amount });
      setAllExpense(res.data);
    } catch (err) {
      console.log(err);
      message.error("Expenses could not be fetched");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllExpense(Filter, expenseCategory, incomePayment, Amount, setAllExpense);
    };
    fetchData();
  }, [Filter, expenseCategory, incomePayment, Amount, setAllExpense]);

  const handleExpenseSubmit = async (values) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      if (updateExpenseData) {
        await axios.post("/expense/updateExpense", {
          expense: {
            user_id: user._id,
            ...values
          },
          expense_id: updateExpenseData.id
        })
        setShowModal2(false);
        setUpdateExpenseData(null);
        console.log({ user_id: user.id, ...values })
        message.success("Expense edited successfully");
        window.location.reload();
      }
    }
    catch (err) {
      message.error("Expense could not be added");
    }
  };

  const handleExpenseDelete = async (record) => {
    try {
      await axios.post("/expense/deleteExpense", { expense_id: record._id })
      message.success("Expense deleted successfully");
      window.location.reload();
    }
    catch (err) {
      console.log(err);
      message.error("Expense could not be deleted");
    }
  }

  const handleModal2Cancel = () => {
    setShowModal2(false);
  };

  const [showModal3, setShowModal3] = useState(false);
  const [allSavings, setAllSavings] = useState([]);
  const [updateSavingsData, setUpdateSavingsData] = useState(null);


  const savingsColumns = [

    { title: "Date", dataIndex: "date", render: (text) => <span>{moment(text).format("MM-DD-YYYY")}</span> },
    { title: "Category", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    { title: "Amount", dataIndex: "amount" },
    {
      title: "Action", render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => (
            setUpdateSavingsData(record), setShowModal3(true)
          )}>Edit</Button>
          <Button type="danger" onClick={() => handleSavingsDelete(record)}>Delete</Button>
        </div>
      )
    }
  ];

  const fetchAllSavings = async (Filter, Amount, setAllSavings) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/savings/fetchAllSavings", { user_id: user.id, filter: Filter, Amount });
      setAllSavings(res.data);
    } catch (err) {
      console.log(err);
      message.error("Savings could not be fetched");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllSavings(Filter, Amount, setAllSavings);
    };
    fetchData();
  }, [Filter, Amount, setAllSavings]);



  const handleSavingsSubmit = async (values) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      await axios.post("/savings/updateSavings", {
        savings: {
          user_id: user._id,
          ...values
        },
        savings_id: updateSavingsData.id
      })
      console.log({ user_id: user.id, ...values })
      message.success("Goal edited successfully");
      setShowModal3(false);
      setUpdateSavingsData(null);
      window.location.reload();
    }
    catch (err) {
      message.error("Goal could not be edited");
    }
  };

  const handleSavingsDelete = async (record) => {
    try {
      await axios.post("/savings/deleteSavings", { savings_id: record._id })
      console.log(record);
      message.success("Goal deleted successfully");
      window.location.reload();
    }
    catch (err) {
      console.log(err);
      message.error("Goal could not be deleted");
    }
  }

  const handleModal3Cancel = () => {
    setShowModal3(false);
  };

  return (
    <Layout>
      <div className="filter">
        <Modal title="Edit Income" open={showModal1} onCancel={handleModal1Cancel} footer={null}>
          <Form layout="vertical" onFinish={handleIncomeSubmit} initialValues={updateIncomeData}>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input the date" },]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please input the category" },]}>
              <Select>
                <Select.Option value="Business">Business</Select.Option>
                <Select.Option value="Housing">Housing</Select.Option>
                <Select.Option value="Insurance">Insurance</Select.Option>
                <Select.Option value="Investment">Investment</Select.Option>
                <Select.Option value="Debt">Debt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description" },]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please input the amount" },]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Payment Method" name="payment_method" rules={[{ required: true, message: "Please input the payment method" },]}>
              <Select>
                <Select.Option value="Credit">Credit</Select.Option>
                <Select.Option value="Debit">Debit</Select.Option>
                <Select.Option value="Cash">Cash</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </Form>
        </Modal>
        <Modal title="Edit Expense" open={showModal2} onCancel={handleModal2Cancel} footer={null}>
          <Form layout="vertical" onFinish={handleExpenseSubmit} initialValues={updateExpenseData}>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input the date" },]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please input the category" },]}>
              <Select>
                <Select.Option value="Business">Business</Select.Option>
                <Select.Option value="Housing">Housing</Select.Option>
                <Select.Option value="Insurance">Insurance</Select.Option>
                <Select.Option value="Investment">Investment</Select.Option>
                <Select.Option value="Debt">Debt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description" },]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please input the amount" },]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Payment Method" name="payment_method" rules={[{ required: true, message: "Please input the payment method" },]}>
              <Select>
                <Select.Option value="Housing">Housing</Select.Option>
                <Select.Option value="Transportation">Transportation</Select.Option>
                <Select.Option value="Entertainment">Insurance</Select.Option>
                <Select.Option value="Personal Care">Personal Care</Select.Option>
                <Select.Option value="Education">Education</Select.Option>
                <Select.Option value="Utilities">Utilities</Select.Option>
                <Select.Option value="Insurance">Insurance</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">Save</Button>
            </div>
          </Form>
        </Modal>
        <Modal title="Edit Goals" open={showModal3} onCancel={handleModal3Cancel} footer={null}>
          <Form layout="vertical" onFinish={handleSavingsSubmit} initialValues={updateSavingsData}>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input the date" },]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please input the category" },]}>
              <Select>
                <Select.Option value="Emergency">Emergency</Select.Option>
                <Select.Option value="Retirement">Retirement</Select.Option>
                <Select.Option value="Travel">Travel</Select.Option>
                <Select.Option value="House">House</Select.Option>
                <Select.Option value="Debt">Debt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description" },]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please input the amount" },]}>
              <Input type="number" />
            </Form.Item>
            <div className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">Save</Button>
            </div>
          </Form>
        </Modal>

      </div>
      <div className="filter">
        <h6>Date</h6>
        <Select value={Filter} onChange={(value) => setFilter(value)}>

          <Select.Option value="all">All</Select.Option>
          <Select.Option value="30">Last One month</Select.Option>
          <Select.Option value="90">Last Three month</Select.Option>
          <Select.Option value="180">Last Six month</Select.Option>
          <Select.Option value="270">Last Nine month</Select.Option>
          <Select.Option value="360">Last Twelve month</Select.Option>
        </Select>
        <h6>Income Category</h6>
        <Select value={incomeCategory} onChange={(value) => setIncomeCategory(value)}>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="Business">Business</Select.Option>
          <Select.Option value="Housing">Housing</Select.Option>
          <Select.Option value="Insurance">Insurance</Select.Option>
          <Select.Option value="Investment">Investment</Select.Option>
          <Select.Option value="Debt">Debt</Select.Option>
        </Select>
        <h6>Expense Category</h6>
        <Select value={expenseCategory} onChange={(value) => setExpenseCategory(value)}>
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="Housing">Housing</Select.Option>
        <Select.Option value="Transportation">Transportation</Select.Option>
        <Select.Option value="Entertainment">Insurance</Select.Option>
        <Select.Option value="Personal Care">Personal Care</Select.Option>
        <Select.Option value="Education">Education</Select.Option>
        <Select.Option value="Utilities">Utilities</Select.Option>
        <Select.Option value="Insurance">Insurance</Select.Option>
        </Select>
        <h6>Amount</h6>
        <Select value={Amount} onChange={(value) => setAmount(value)}>

          <Select.Option value="all">All</Select.Option>
          <Select.Option value="1000"> less than 1,000</Select.Option>
          <Select.Option value="2000">less than 2,000</Select.Option>
          <Select.Option value="5000">less than 5,000</Select.Option>
          <Select.Option value="10000">less than 10,000</Select.Option>
          <Select.Option value="20000">less than 20,000</Select.Option>
        </Select>
        <h6>Payment Method</h6>
        <Select value={incomePayment} onChange={(value) => setIncomePayment(value)}>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="Credit">Credit</Select.Option>
          <Select.Option value="Debit">Debit</Select.Option>
          <Select.Option value="Cheque">Cheque</Select.Option>
          <Select.Option value="Cash">Cash</Select.Option>
        </Select>
        <Button type="primary" className="filters" onClick={() => setViewData("table")} >Table</Button>
        <Button type="primary" className="filters" onClick={() => setViewData("Analytics")}>Visualisation</Button>
      </div>
      <div content="content">
        {viewData === "table" && (
          <>
            <div className="filter-title"><h4>Income Table</h4></div>
            <Table columns={incomeColumns} dataSource={allIncome} />
            <div className="filter-title"><h4>Expense Table</h4></div>
            <Table columns={expenseColumns} dataSource={allExpense} />
            <div className="filter-title"><h4>Goals Table</h4></div>
            <Table columns={savingsColumns} dataSource={allSavings} />
          </>
        )}
        {viewData !== "table" && <Visualisation allIncome={allIncome} allExpense={allExpense} allGoals={allSavings} />}
      </div>
    </Layout>
  );
};

export default Transactions;
