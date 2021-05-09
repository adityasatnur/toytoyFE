import React from "react";
import ReactDOM from "react-dom";
import ProductLandingPage from './pages/ProductLandingPage'
import './index.scss';

const App = () => {
  return (
    <ProductLandingPage/>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));