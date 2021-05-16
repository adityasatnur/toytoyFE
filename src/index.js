import React from "react";
import ReactDOM from "react-dom";
import ProductLandingPage from "./pages/ProductLandingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemUpload from './pages/ItemUpload';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";

const App = () => {
  return (
    <Router>
      <Link to="/admin">Admin</Link>
      <Switch>
        <Route path="/PLP">
          <ProductLandingPage />
        </Route>

        <Route path="/admin">
          {/* <Home /> */}
          <ItemUpload />
        </Route>
        <Route path="/">{/* <Home /> */}</Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
