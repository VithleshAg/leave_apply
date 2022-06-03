import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Check22 from "./user/Check22";

import "./App.css";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Check22} />
        <Route path="/signin" exact component={Signin} />
        {/* <Route path="/signup" exact component={Signup} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
