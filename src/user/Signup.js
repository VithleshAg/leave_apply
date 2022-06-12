import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "./apiUser";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassowrd: "",
    error: "",
    success: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { name, email, password, confirmPassowrd, error, success } = values;

  const signupForm = () => (
    <form action="action_page.php">
      <div className="container">
        <h1>SignUp Form</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label htmlFor="name">
          <b>Employee Name</b>
        </label>
        <input
          type="text"
          onChange={handleChange("name")}
          value={name}
          placeholder="Enter Employee Name"
          required
        />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          onChange={handleChange("email")}
          value={email}
          placeholder="Enter Email"
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
        <label htmlFor="psw-repeat">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          onChange={handleChange("confirmPassowrd")}
          value={confirmPassowrd}
          placeholder="Confirm Password"
          required
        />
        {/* <label> <input type="checkbox" name="remember" /> Remember me </label> */}
        <p>
          By creating an account you agree to our
          <a href="#">Terms &amp; Privacy</a>.
        </p>
        <div className="clearfix">
          {/* <button type="button" className="cancelbtn">Cancel</button> */}
          <button type="submit" onClick={clickSubmit} className="signupbtn">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (!data) {
        setValues({
          ...values,
          error: "Something went wrong",
          success: false,
          loading: false,
        });
      } else if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirmPassowrd: "",
          error: "",
          success: true,
        });
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <div className="App">
      {showError()}
      {showSuccess()}
      {signupForm()}
    </div>
  );
};

export default Signup;
