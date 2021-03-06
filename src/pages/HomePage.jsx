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
import Profile from "./Profile";
import LandingPage from "./LandingPage";
import DeliveriesPage from "./DeliveriesPage";
import Checkout from "./Checkout";
import LoginPopup from "../components/LoginPopup";
import Footer from "../components/Footer";
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import CancellationPolicy from './CancellationPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import TermsConditions from './TermsConditions'
import ReturnRefund from './ReturnRefund'
import PaymentStatus from '../components/PaymentStatus'
import Loader from '../components/Loader'


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
  const [showLoader, setShowLoader] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
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
      setShowLoader(true)
      getItems();
    }
    let sessionCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if(sessionCartItems && sessionCartItems!=='[]'){
      setCartItems(sessionCartItems);
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
          setFilterApplied(true);
          setFilteredItems(x);
        }
      }
    }
    if (
      history.location.state &&
      history.location.state.filteredData === "buyout"
    ) {
      setActiveLibraryTab(false);
      setFilterApplied(false);

    }
    if (!isSidebarOpen) {
      setTimeout(() => {
        sidebarRef.current.style.display = "none";
      }, 800);
      document.getElementsByTagName('body')[0].style.overflow = "visible"

    } else {
      document.getElementsByTagName('body')[0].style.overflow = "hidden"
      sidebarRef.current.style.display = "block";
      
    }
    if (!isMinibagOpen) {
      setTimeout(() => {
        minibagRef.current.style.display = "none";
      }, 800);
      document.getElementsByTagName('body')[0].style.overflow = "visible"

    } else {
      document.getElementsByTagName('body')[0].style.overflow = "hidden"
      minibagRef.current.style.display = "block";
    }
    return () => {
      let x = [];
      if (history.location.pathname !== "/PLP") {
        history.replace({
          state: { ...history.location.state, filteredData: undefined },
        });
      }
    };
  }, [isSidebarOpen, isMinibagOpen, items, history.location.pathname]);

  useEffect(() => {
    if (currentUser) {
      updateOrCreateUser();
    }
  }, [currentUser]);
useEffect(() => {
  let purchase
    if(history.location.state && history.location.state.filteredData==="Library"){
      purchase = false;
    }else if(history.location.state && history.location.state.filteredData==="Buyout"){
      purchase = true;
    }else{
      purchase = false;
    }
    let x = items.filter(
      (i) => i.purchasable === purchase
    );
    setFilterApplied(true);
    setFilteredItems(x);
}, [history.location.state && history.location.state.filteredData])
  const updateOrCreateUser = async () => {
    let data = {
      userName: currentUser.displayName,
      userEmail: currentUser.email,
    };
    await axios
      .post(`${PORT}/api/updateOrCreateUser`, data, {
        headers: {
          // 'Content-Type': 'application/plain',
        },
      })
      .then((res) => {
        setUserData(res.data);
      });
  };
  const signIn = () => {
    signInWithGoogle();
    openLoginModel();
  };
  const openLoginModel = () => {
    setShowLoginModel(!showLoginModel);
  };
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
  const applyFiltersHandler = () => {
    setFilterApplied(true);
    let filteredItemsLocal = [];
    debugger;
    if (filters.length > 0) {
      filterApplied && filteredItems.filter((item) => {
        filters.forEach((el) => {
          let x = item.category.find((i) => i.name === el);
          let y = item.ageGroup.find((i) => i.name === el);
          let z = false;
          if(item.toySet === el){
            z = true;
          }
          if (x || y || z) {
            filteredItemsLocal.push(item);
          }
        });
      });
    } else {
      filteredItemsLocal = [...items];
      setFilteredItems(filteredItemsLocal);
      return;
    }
    if (filteredItemsLocal.length === 0) {
      setFilteredItems(new Array());
    } else {
      setFilteredItems(filteredItemsLocal);
    }
  };
  const changeCategory= (e)=>{
    let val = e.target.value;
    let purchase
    debugger;
    if(history.location.state && history.location.state.filteredData==="Library"){
      purchase = false;
    }else if(history.location.state && history.location.state.filteredData==="Buyout"){
      purchase = true;
    }else{
      purchase = false;
    }
    history.push({
      state: { filteredData: val },
    });
    let x = items.filter(
      (i) => i.type === val && i.purchasable === purchase
    );
    if(val==="All"){
       x = items.filter(
        (i) => i.purchasable === purchase
      );
    }else{
      
    }
    setFilterApplied(true);
    setFilteredItems(x);
  }
  const addToCart = (id) => {
    let itemCopy = [...items];
    debugger;
    let findDuplicateInCart = cartItems.find((item) => item._id === id);
    if (findDuplicateInCart === undefined) {
      let newArr = itemCopy.filter((item) => item._id === id);
      let i = [...cartItems, ...newArr]
      setCartItems(i);
      localStorage.setItem('cartItems', JSON.stringify(i));
    } else {
      let newArr = cartItems.filter((item) => item._id !== id);
      let i = [...newArr]
      setCartItems(i);
      localStorage.setItem('cartItems', JSON.stringify(i));
    }
  };
  const getItems = async () => {
    await axios.get(`${PORT}/api/get/addItem`).then((res) => {
      let arr = [...items, ...res.data];
      setItems(arr);
        setShowLoader(false)

    });
  };
  const navigateTo = (page) => {
    switch (page) {
      case "toy":
      case "book":
        setFilterApplied(true);
        if (history.location.pathname !== "/PLP" || (history.location.state && history.location.state.filteredData)) {
          history.push({
            pathname: "/PLP",
            state: { filteredData: page },
          });
        }
        break;
      case "home":
        if (history.location.pathname !== "/") {
          history.push({ pathname: "/" });
        }
        break;
      case "profile":
        if (history.location.pathname !== "/profile") {
          history.push({ pathname: "/profile" });
        }
        break;
        case "PLP":
          setFilterApplied(false);
        history.push({ pathname: "/PLP" });
        break;
    
      case "aboutus":
        history.push({ pathname: "/aboutus" });
        break;
        case "contactus":
        history.push({ pathname: "/contactus" });
        break;
        case "privacy":
        history.push({ pathname: "/privacy" });
        break;
        case "terms":
        history.push({ pathname: "/terms" });
        break;
        case "returnrefund":
        history.push({ pathname: "/returnrefund" });
        break;
        case "cancellation":
        history.push({ pathname: "/cancellation" });
        break;
        case "checkout":
        history.push({ pathname: "/checkout" });
        break;
    }
    SetIsSideBarOpen(false);
  };
  const hamburgerClick = () => {
    SetIsSideBarOpen(!isSidebarOpen);
  };
  const minibagClick = () => {
    SetIsMinibagOpen(!isMinibagOpen);
  };
  const closeModel = () => {
    setShowLoginModel(!showLoginModel);
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
            {items.length === 0 ||
            (filterApplied && filteredItems.length === 0) ? (
              <p className="noItemsFound">Sorry, No items found</p>
            ) : (
              <Tabs
                addToCart={addToCart}
                items={filterApplied ? filteredItems : items}
                activetab={activeLibraryTab}
                changeCategory={changeCategory}
              ></Tabs>
            )}
          </div>
        </Route>
        <Route path="/PDP" exact>
          <ProductDetailsPage addToCart={addToCart} cartItems={cartItems} />
        </Route>
        <Route path="/Profile" exact>
          {userData ? (
            <Profile userData={userData} />
          ) : (
            <p>Please login to continue</p>
          )}
        </Route>
        <Route path="/deliveries" exact>
          <DeliveriesPage />
        </Route> 
        <Route path="/checkout"  exact>
        {userData ? (
          <Checkout addToCart={addToCart} userData={userData} cartItems={cartItems}
        />)
        : (
          <p>Please login to continue</p>
        )}
        </Route>
        <Route path="/aboutus" exact>
          <AboutUs />
        </Route>
        <Route path="/contactus" exact>
          <ContactUs />
        </Route>
        <Route path="/privacy" exact>
          <PrivacyPolicy />
        </Route>
        <Route path="/terms" exact>
          <TermsConditions />
        </Route>
        <Route path="/returnrefund" exact>
          <ReturnRefund />
        </Route>
        <Route path="/cancellation" exact>
          <CancellationPolicy />
        </Route>
        <Route exact path="/status/:orderId" component={PaymentStatus} />
        <Route exact path="/Loader" component={Loader} />

        <Route path="/">
          <LandingPage items={items} addToCart={addToCart} userData={userData} />
        </Route>
      </Switch>
    );
  };
  return (
    <>
    {showLoader ? <Loader/> : null}
    <div className={(history.location.pathname === "/PDP" ? "PDP" : "" || showLoader ? 'noner' : "")}>
      <Header
        isSidebarOpen={isSidebarOpen}
        hamburgerClick={hamburgerClick}
        minibagClick={minibagClick}
        cartItems={cartItems}
        navigateTo={navigateTo}
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
        userData={userData}
        addToCart={addToCart}

      />
      {showLoginModel ? (
        <LoginPopup
          currentUser={currentUser}
          signIn={signIn}
          signOut={signOut}
          closeModel={closeModel}
        />
      ) : null}
      {renderPageData()}

        
      <Footer navigateTo={navigateTo}></Footer>
    </div>
      </>
  );
};
export default withRouter(HomePage);
