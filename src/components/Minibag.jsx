import React, {useRef, useState, useEffect} from "react";
import SidebarCartItem from './SidebarCartItem';
import "../styles/sidebar.scss";
import shoppingBag from "../assets/icons/shoppingBag.png";
import profilePic from "../assets/icons/maleIcon.jpeg";
import editIcon from "../assets/icons/edit.svg";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import sigma from "../assets/icons/sigma.png";
import { useHistory } from 'react-router-dom'

const Minibag = (props) => {
    const history = useHistory();

const [minibagTotal, setMinibagTotal]=useState(0)
useEffect(() => {
  let total = 0
  props.cartItems.forEach(item=>{
    (typeof(item.cost) === "number") && (total += item.cost)
    
  })
  setMinibagTotal(total)
  
}, [props.cartItems])

const goToCheckout= ()=>{
  if(!props.currentUser){
    props.openLoginModel()
  }
  let nonPurchasable = true;
  debugger;
  props.cartItems.every(item=>{
    if(!item.purchasable){
      nonPurchasable = false
      return false
    }
    
  })
  if(props.userData.userPlanType!== "0" || nonPurchasable){
    history.push({
        pathname: '/checkout',
      });
    }else{
      props.closeMinibag();
      debugger;
      history.push({
        pathname: '/home',
        state :{fromPlans:true}
      });
    }

}
  return (
        <>
          <div className={`sidebar ${props.isMinibagOpen && "sidebar-open"}`} ref={props.minibagRef}>
            <div className="sidebar-header">
              <div className="shoppingBag">
                <img src={shoppingBag}></img>
                <span>{props.cartItems.length}</span>
              </div>
              <img src={props.currentUser ? props.currentUser.photoURL : profilePic} className="userIcon"></img>
        <span className="userName">{props.currentUser ? props.currentUser.displayName : "Login/Signup"}</span>
            </div>
            {props.cartItems.length > 0 ?
            <>
            <div className="sidebar-order-list">
              <div className="list-title">
                <p>My order</p>
                <img src={editIcon} alt="" />
              </div>
              {props.cartItems.map((item)=>{
                  // setMinibagTotal(minibagTotal + item.cost)
                  return <SidebarCartItem item={item}></SidebarCartItem>
              })}
            </div>
            <div className="sidebar-total">
                <div  className="deliveryTruck">
                <img src={sigma} alt=""/>
                   </div>
                <div>
                    <div>Total</div>
                    <div></div>
                </div>
                <div>{minibagTotal}</div>
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
              <button onClick={goToCheckout}>Checkout</button>
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
