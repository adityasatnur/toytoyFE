import React from "react";
import SearchBar from "./SearchBar";
import "../styles/Header.scss";
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";
import Logo from "../assets/images/toytoylogo.svg";

const Header = (props) => {
  return (
    <div className="Header">
      <div
        className={`hamburger ${props.isSidebarOpen && "sidebar-open"}`}
        onClick={props.hamburgerClick}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="logo" onClick={()=>props.navigateTo('home')}>
        <p>The</p>
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/toytoy-bd37c.appspot.com/o/images%2Ftoytoy.png?alt=media&token=112e5b90-5390-4dbb-b9b3-0aca0b942e86"
          }
          alt=""
        />
        <p>Library</p>
      </div>
      {/* <SearchBar></SearchBar> */}
      <div className="sidebar-header">
        <div className="shoppingBag" onClick={props.minibagClick}>
          <img src={shoppingBag}></img>
          <span>{props.cartItems.length}</span>
        </div>
        <img src={props.currentUser ? props.currentUser.photoURL : profilePic} className="userIcon" onClick={props.openLoginModel}></img>
        <span className="userName" onClick={props.openLoginModel}>{props.currentUser ? props.currentUser.displayName : "Login/Signup"}  </span>
      </div>
    </div>
  );
};
export default Header;
