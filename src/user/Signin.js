import "../App.css";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import { signin } from "./apiUser";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const { email, password, error, loading, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const signinForm = () => {
    return (
      <div>
        <h2>Login Form</h2>
        <form action="/action_page.php" method="post">
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              onChange={handleChange("email")}
              value={email}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              onChange={handleChange("password")}
              value={password}
              placeholder="Enter Password"
              required
            />
            <button type="submit" onClick={clickSubmit}>
              Login
            </button>
            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" />{" "}
              Remember me
            </label>
          </div>
          <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <span className="psw">
              Forgot <a href="#">password?</a>
            </span>
          </div>
        </form>
      </div>
    );
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (!data) {
        setValues({
          ...values,
          error: "Something went wrong",
          success: false,
          loading: false,
        });
      } else if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          email: "",
          password: "",
          success: true,
          loading: false,
        });
        // <Redirect to="/user/dashboard" />;
      }
    });
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading.....</h2>
      </div>
    );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <div>
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
