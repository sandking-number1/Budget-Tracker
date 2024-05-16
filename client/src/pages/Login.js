import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      let { data } = await axios.post("/users/login", values);
      message.success("login success");
      localStorage.setItem("user", JSON.stringify({ ...data })
      );
      navigate("/");
    } catch (error) {
      message.error("Invalid email or password");
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
          <h1>Login Form</h1>

          <Form.Item label="Email:" name="email" rules={[
            { required: true, message: "Please input your email" },
          ]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password:" name="password" rules={[{ required: true, message: "Please input your password" }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-primary" size="large">Login</button>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Register now!</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
