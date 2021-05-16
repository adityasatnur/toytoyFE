import React from 'react';
import SearchBar from './SearchBar';
import '../styles/Header.scss';
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";

const Header = (props) => {
return(
    <div className="Header">
        <div className={`hamburger ${props.isSidebarOpen && "sidebar-open"}`} onClick={props.hamburgerClick}> 
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>logo</div>
        <SearchBar></SearchBar>
        <div className="sidebar-header">
          <div className="shoppingBag">
            <img src={shoppingBag}></img>
          </div>
          <img src={profilePic} className="userIcon"></img>
          <span className="userName">Satyam Bora</span>
        </div>
    </div>
)
}
export default Header;