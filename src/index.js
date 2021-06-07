import React from "react";
import ReactDOM from "react-dom";
import ProductLandingPage from "./pages/ProductLandingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemUpload from './pages/ItemUpload';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/admin" exact>
        

          <ItemUpload />

        </Route>
        </Switch>
           <HomePage /> 
        </Router>
           </>
    //     <Route path="/PLP" exact>
    //       <ProductLandingPage />
    //     </Route>
    //     <Route path="/PDP" exact>
    //       <ProductDetailsPage />
    //     </Route>
    //     <Route path="/Home" exact>
    //       <HomePage />
    //     </Route>
        
    //   </Switch>
    // </Router>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
