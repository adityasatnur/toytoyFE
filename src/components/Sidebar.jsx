import React, {useRef} from "react";
import "../styles/sidebar.scss";
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";

const Sidebar = (props) => {
  return (
    <>
      <div className={`sidebar ${props.isSidebarOpen && "sidebar-open"}`} ref={props.sidebarRef}>
        <div className="sidebar-header">
          <div className="shoppingBag">
            <img src={shoppingBag}></img>
            <span>{props.cartItems.length}</span>
          </div>
          <img src={props.currentUser ? props.currentUser.photoURL : profilePic} className="userIcon" onClick={props.openLoginModel}></img>
        <span className="userName"  onClick={props.openLoginModel}>{props.currentUser ? props.currentUser.displayName : "Login/Signup"}</span>
        </div>
        <div className="Sidebar-NavItems">
          <div onClick={()=>props.navigateTo('home')}>Home</div>
          <div onClick={()=>props.navigateTo('toy')}>Toys</div>
          <div onClick={()=>props.navigateTo('book')}>Books</div>
          <div onClick={()=>props.navigateTo('PLP')}>All Products</div>
          <div onClick={()=>props.navigateTo('profile')}>Profile</div>
          <div onClick={props.openLoginModel}>{props.currentUser ? "Logout" : "Login"}</div>
        </div>
      </div>
        {props.isSidebarOpen?
        <div className="sidebarBackdrop" onClick={props.closeSidebar}></div>:null}
    </>
  );
};
export default Sidebar;
