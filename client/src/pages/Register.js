import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      message.error("Email Already Exists");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="resgister-page ">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name:" name="name" rules={[
            { required: true, message: "Please input your name" },
          ]}>
            <Input type="name" />
          </Form.Item>
          <Form.Item label="Email:" name="email" rules={[
            { required: true, type: "email", message: "Please input your email" },
          ]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password:" name="password" rules={[{ required: true, message: "Please input your password" }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-primary" size="large">Register</button>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Login now!</Link>
          </div>
        </Form>
      </div>
    </>

  );
};

export default Register;