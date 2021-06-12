import React, {useRef} from "react";
import SidebarCartItem from './SidebarCartItem';
import "../styles/sidebar.scss";
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";
import editIcon from "../assets/icons/edit.svg";
import deliveryTruck from "../assets/icons/delivery-truck.png";

const Minibag = (props) => {
    return (
        <>
          <div className={`sidebar ${props.isMinibagOpen && "sidebar-open"}`} ref={props.minibagRef}>
            <div className="sidebar-header">
              <div className="shoppingBag">
                <img src={shoppingBag}></img>
                <span>{props.cartItems.length}</span>
              </div>
              <img src={profilePic} className="userIcon"></img>
              <span className="userName">Satyam Bora</span>
            </div>
            {props.cartItems.length > 0 ?
            <>
            <div className="sidebar-order-list">
              <div className="list-title">
                <p>My order</p>
                <img src={editIcon} alt="" />
              </div>
              {props.cartItems.map((item)=>{
                  return <SidebarCartItem item={item}></SidebarCartItem>
              })}
            </div>
            
            <div className="sidebar-total">
                <div className="deliveryTruck"> 
    
                <img src={deliveryTruck} alt=""/>
                </div>
                <div>
                    <div>Delivery</div>
                    <span>2-4 Days</span>
                </div>
                <div>Free</div>
            </div>
            <div className="sidebar-footer">
              <button>Checkout</button>
            </div> 
            </>
            : 
            <p className="NoItemFound"> Sorry, No Items Found in the Cart</p>}
          </div>
          {props.isMinibagOpen ?
          <div className="sidebarBackdrop" onClick={props.closeMinibag}></div>:null}
        </>
      );
};
export default Minibag;
