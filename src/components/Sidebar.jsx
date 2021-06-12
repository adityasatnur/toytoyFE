import React, {useRef} from "react";
import SidebarCartItem from './SidebarCartItem';
import "../styles/sidebar.scss";
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";
import editIcon from "../assets/icons/edit.svg";
import deliveryTruck from "../assets/icons/delivery-truck.png";

const Sidebar = (props) => {
  return (
    <>
      <div className={`sidebar ${props.isSidebarOpen && "sidebar-open"}`} ref={props.sidebarRef}>
        <div className="sidebar-header">
          <div className="shoppingBag">
            <img src={shoppingBag}></img>
            <span>{props.cartItems.length}</span>
          </div>
          <img src={profilePic} className="userIcon"></img>
          <span className="userName">Satyam Bora</span>
        </div>
        <div className="Sidebar-NavItems">
          <div>Home</div>
          <div>Toys</div>
          <div>Books</div>
          <div>Profile</div>
          <div>Login</div>
        </div>
      </div>
        {props.isSidebarOpen?
        <div className="sidebarBackdrop" onClick={props.closeSidebar}></div>:null}
    </>
  );
};
export default Sidebar;
