import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import ItemUpload from './pages/ItemUpload';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";
import HomePage from "./pages/HomePage";



const App = () => {
  const history = createBrowserHistory();

  return (
    <>
    <Router history={history}>
           <HomePage /> 
      <Switch>
        <Route path="/admin" exact>
        

          <ItemUpload />

        </Route>
        </Switch>
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
