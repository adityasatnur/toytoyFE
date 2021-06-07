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
      <div className="logo">
        <p>The</p>
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/toytoy-bd37c.appspot.com/o/images%2Ftoytoy.png?alt=media&token=112e5b90-5390-4dbb-b9b3-0aca0b942e86"
          }
          alt=""
        />
        <p>Library</p>
      </div>
      <SearchBar></SearchBar>
      <div className="sidebar-header">
        <div className="shoppingBag">
          <img src={shoppingBag}></img>
        </div>
        <img src={profilePic} className="userIcon"></img>
        <span className="userName">Satyam Bora</span>
      </div>
    </div>
  );
};
export default Header;
