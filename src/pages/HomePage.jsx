import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Minibag from "../components/Minibag";
import Filters from "../components/Filters";
import Tabs from "../components/Tabs";
import "../styles/ProductLandingPage.scss";
import "../styles/HomePage.scss";
import { PORT } from "../serverConfig";
import ProductDetailsPage from "./ProductDetailsPage";
import LandingPage from "./LandingPage";
import LoginPopup from "../components/LoginPopup";
import {
  auth,
  signInWithGoogle,
  signOutFromGoogle,
} from "../firebase/firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, SetIsSideBarOpen] = useState(false);
  const [isMinibagOpen, SetIsMinibagOpen] = useState(false);
  const [activeLibraryTab, setActiveLibraryTab] = useState(true);
  const [filters, setFilters] = useState([]);
  const sidebarRef = useRef();
  const minibagRef = useRef();

  useEffect(() => {
    if (currentUser === null) {
      auth.onAuthStateChanged((userAuth) => {
        setCurrentUser(userAuth);
      });
    }
    if (!items.length && !filters.length) {
      getItems();
    }
    if (
      history.location.state &&
      history.location.state.filteredData !== "buyout"
    ) {
      if (
        history.location.pathname === "/PLP" &&
        history.location.state.filteredData
      ) {
        let x = items.filter(
          (i) => i.type === history.location.state.filteredData
        );
        if (items.length > 0 && x.length !== items.length) {
          setItems(x);
        }
      }
    }
    if (
      history.location.state &&
      history.location.state.filteredData === "buyout"
    ) {
      setActiveLibraryTab(false);
    }
    if (!isSidebarOpen) {
      setTimeout(() => {
        sidebarRef.current.style.display = "none";
      }, 800);
    } else {
      sidebarRef.current.style.display = "block";
    }
    if (!isMinibagOpen) {
      setTimeout(() => {
        minibagRef.current.style.display = "none";
      }, 800);
    } else {
      minibagRef.current.style.display = "block";
    }
    return () => {
      let x = [];
      if (history.location.pathname !== "/PLP") {
        history.replace({ state: { filteredData: undefined } });
      }
    };
  }, [isSidebarOpen, isMinibagOpen, items, history.location.pathname]);

  const signIn = () => {
    signInWithGoogle();
    openLoginModel();
  };
  const openLoginModel=()=>{
    setShowLoginModel(!showLoginModel);
  }
  const signOut = () => {
    signOutFromGoogle();
    openLoginModel();
  };
  const addFilter = (filterName) => {
    setFilters([...filters, filterName]);
  };
  const removeFilter = (filterName) => {
    let newFilter = filters.filter((item) => filterName !== item);
    setFilters([...newFilter]);
  };
  const applyFiltersHandler = (filterType) => {
    setFilterApplied(true);
    let filteredItems = [];
    items.filter((item) => {
      if (filterType === "toys") {
        loop1: for (let i = 0; i < item.category.length; i++) {
          for (let j = 0; j < filters.length; j++) {
            if (item.category[i].name === filters[j]) {
              filteredItems.push(item);
              break loop1;
            }
          }
        }
      } else {
        for (let j = 0; j < filters.length; j++) {
          if (item[filterType] === filters[j]) {
            filteredItems.push(item);
          }
        }
      }
    });
    if (filteredItems.length === 0) {
      setFilteredItems(new Array());
    } else {
      setFilteredItems(filteredItems);
    }
  };
  const addToCart = (id) => {
    let itemCopy = [...items];
    let findDuplicateInCart = cartItems.find((item) => item._id === id);
    if (findDuplicateInCart === undefined) {
      let newArr = itemCopy.filter((item) => item._id === id);
      setCartItems([...cartItems, ...newArr]);
    } else {
      let newArr = cartItems.filter((item) => item._id !== id);
      setCartItems([...newArr]);
    }
  };
  const getItems = async () => {
    await axios.get(`${PORT}/api/get/addItem`).then((res) => {
      let arr = [...items, ...res.data];
      setItems(arr);
    });
  };
  const navigateTo = (page) => {
    switch (page) {
      case "toy":
      case "book":
        history.push({
          pathname: "/PLP",
          state: { filteredData: page },
        });
        break;
      case "home":
        history.push({ pathname: "/" });
        break;
      case "profile":
        history.push({ pathname: "/profile" });
        break;
      case "login":
        history.push({ pathname: "/login" });
        break;
    }
    SetIsSideBarOpen(!isSidebarOpen);
  };
  const hamburgerClick = () => {
    SetIsSideBarOpen(!isSidebarOpen);
  };
  const minibagClick = () => {
    SetIsMinibagOpen(!isMinibagOpen);
  };
  const renderPageData = () => {
    return (
      <Switch>
        <Route path="/PLP" exact>
          <div className="ProductLandingPage">
            <Filters
              addFilter={addFilter}
              removeFilter={removeFilter}
              applyFiltersHandler={applyFiltersHandler}
            ></Filters>
            {items.length === 0 ? (
              <p className="noItemsFound">Sorry, No items found</p>
            ) : (
              <Tabs
                addToCart={addToCart}
                items={filterApplied ? filteredItems : items}
                activetab={activeLibraryTab}
              ></Tabs>
            )}
          </div>
        </Route>
        <Route path="/PDP" exact>
          <ProductDetailsPage addToCart={addToCart} cartItems={cartItems} />
        </Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
      </Switch>
    );
  };
  return (
    <div className={history.location.pathname === "/PDP" ? "PDP" : ""}>
      <Header
        isSidebarOpen={isSidebarOpen}
        hamburgerClick={hamburgerClick}
        minibagClick={minibagClick}
        cartItems={cartItems}
        currentUser={currentUser}
        openLoginModel={openLoginModel}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
        cartItems={cartItems}
        closeSidebar={hamburgerClick}
        navigateTo={navigateTo}
        currentUser={currentUser}
        openLoginModel={openLoginModel}

      />
      <Minibag
        isMinibagOpen={isMinibagOpen}
        minibagRef={minibagRef}
        cartItems={cartItems}
        closeMinibag={minibagClick}
        currentUser={currentUser}
        openLoginModel={openLoginModel}

      />
      {showLoginModel ? (
        <LoginPopup
          currentUser={currentUser}
          signIn={signIn}
          signOut={signOut}
        />
      ) : null}
      {renderPageData()}
    </div>
  );
};
export default withRouter(HomePage);
