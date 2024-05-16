import React, { useState } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [showModal1, setShowModal1] = useState(false);
    const handleShowModal1 = () => {
        setShowModal1(true);
    };

    const handleModal1Cancel = () => {
        setShowModal1(false);
    };
    const handleIncomeSubmit = async (values) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            await axios.post("/income", { user_id: user.id, ...values })
            console.log({ user_id: user.id, ...values })
            message.success("Income added successfully");
        }
        catch (err) {
            message.error("Income could not be added");
        }
        setShowModal1(false);
    };

    const [showModal2, setShowModal2] = useState(false);

    const handleExpenseSubmit = async (values) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            await axios.post("/expense", { user_id: user.id, ...values })
            console.log({ user_id: user.id, ...values })
            message.success("Expense added successfully");
        }
        catch (err) {
            message.error("Expense could not be added");
        }
        setShowModal2(false);
    };
    const handleShowModal2 = () => {
        setShowModal2(true);
    };

    const handleModal2Cancel = () => {
        setShowModal2(false);
    };

    const [showModal3, setShowModal3] = useState(false);
    const handleSavingsSubmit = async (values) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            await axios.post("/savings", { user_id: user.id, ...values })
            console.log({ user_id: user.id, ...values })
            message.success("Goal added successfully");
        }
        catch (err) {
            message.error("Goal name already exists");
        }
        setShowModal3(false);
    };

    const handleShowModal3 = () => {
        setShowModal3(true);
    };

    const handleModal3Cancel = () => {
        setShowModal3(false);
    };

    return (
        <Layout>
            <div className="filter">Add Income
                <Button type="primary" onClick={handleShowModal1}>Add</Button>
                <Modal title="Add Income" open={showModal1} onCancel={handleModal1Cancel} footer={null}>
                    <Form layout="vertical" onFinish={handleIncomeSubmit}>
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
                            <button type="submit" className="btn btn-primary" >
                                Save
                            </button>
                        </div>
                    </Form>
                </Modal>
            </div>
            <div className="filter">Add Expense
                <Button type="primary" onClick={handleShowModal2}>Add</Button>
                <Modal title="Add Expense" open={showModal2} onCancel={handleModal2Cancel} footer={null}>
                    <Form layout="vertical" onFinish={handleExpenseSubmit}>
                        <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input the date" },]}>
                            <Input type="date" />
                        </Form.Item>
                        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please input the category" },]}>
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
                                <Select.Option value="cash">Cash</Select.Option>
                            </Select>
                        </Form.Item>
                        <div className="d-flex justify-content-center">
                            <Button type="primary" htmlType="submit">Save</Button>
                        </div>
                    </Form>
                </Modal>
            </div>
            <div className="filter">Add Goals
                <Button type="primary" onClick={handleShowModal3}>Add</Button>
                <Modal title="Add Goals" open={showModal3} onCancel={handleModal3Cancel} footer={null}>
                    <Form layout="vertical" onFinish={handleSavingsSubmit}>
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
                        <Form.Item label="Name" name="description" rules={[{ required: true, message: "Please input the description" },]}>
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
                View all Transactions and Goals<Link to="/transaction"><Button type="primary">Show</Button> </Link>
            </div>
        </Layout>
    );
};

export default HomePage;