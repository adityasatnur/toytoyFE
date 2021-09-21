import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import "../styles/Checkout.scss";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import sigma from "../assets/icons/sigma.png";
import axios from "axios";
import { PORT } from "../serverConfig";
import DeliveryData from "../components/DeliveryData";
import {post} from '../functions/paytmFunctions';
import {pinCodesWithRates} from '../functions/pincodes';


const Checkout = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const [buyoutItems, setBuyoutItems] = useState(null);
  const [rentedItems, setRentedItems] = useState(null);
  const [plans, setPlans] = useState(undefined);
  const [total, setTotal]= useState(0);
  const [buyoutTotal, setBuyoutTotal]= useState(0);
  const [pincode, setPincode]= useState(null);
  const history = useHistory()
 
  useEffect(()=>{
    let rented = [];
    let buyout = [];
    let pin = localStorage.getItem('pinCode')
    debugger;
    let items = JSON.parse(localStorage.getItem('cartItems'))
    let plan = localStorage.getItem('plans')!=='undefined' ?JSON.parse(localStorage.getItem('plans')):localStorage.getItem('plans');
    items && items.map(item=>{
      if(item.purchasable === true){
        buyout.push(item)
      }else{
        rented.push(item)
      }
    })
    
    setBuyoutItems(buyout)
    setRentedItems(rented)
    
    plan && plan!=="undefined" && setPlans(plan)
    debugger;
    if(buyout || (plan && plan!=="undefined")){
      let total = 0;
      let buyoutTotal = 0
      if(buyout){
        buyout.map((item)=>{
            total+=item.cost
        })
        buyoutTotal = total;
        setBuyoutTotal(buyoutTotal)
      }
      if(plan && plan!=="undefined"){
        total+=plan.cost
      }
      if(rented.length>0 && buyoutTotal < 799){
        if(pincode){
          total += pinCodesWithRates[pincode]
        }
      }
      if(rented.length>0 && props.userData&&props.userData.credits<=0){
        if(pincode){
          total += pinCodesWithRates[pincode]
            }
        }
      setTotal(total)
    }
  }, [pincode, props.cartItems])

  const setthePinCode=(pin)=>{
    setPincode(pin)
  }
  const showDeliveryData = () =>{
    setShowProfile(true)
  }
  const redirecToPaytm = () => {
    if(total>0){
      let buyoutItemsArray=[]
      buyoutItems.length && buyoutItems.map(item=>{
        return buyoutItemsArray.push(item._id)
      })
      let rentedItemsArray=[]
      rentedItems.length && rentedItems.map(item=>{
        return rentedItemsArray.push(item._id)
      })
      let data = {
        amount: total,
        name: props.userData.userName,
        userId: props.userData._id,
        buyoutItems: buyoutItemsArray,
        rentedItems: rentedItemsArray,
        plans: plans
      }
      axios.post(`${PORT}/api/payment`, data)
        .then(res => {
          var information={
           //  action:`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
             action:`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
          params:res
        }
      post(information)
      localStorage.setItem('cartItems', null)
      localStorage.setItem('plans', null)
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      //Make api call to add rental items to delivery
      let rentedItemsArray=[]
      rentedItems.length && rentedItems.map(item=>{
        return rentedItemsArray.push(item._id)
      })
      let data = {
        name: props.userData.userName,
        userId: props.userData._id,
        rentedItems: rentedItemsArray
            }
      axios.post(`${PORT}/api/addProductsToDelivery`, data)
        
    }
  }

  const removePlan = ()=>{
    localStorage.setItem('plans',undefined)
    setPlans(undefined)
  }
  const redirectToPlans=()=>{
      history.push({
        pathname: '/home',
        state :{fromPlans:true}
      });
  }
  return (
    <>
    <div className="Checkout">
      {(buyoutItems && buyoutItems.length)|| (rentedItems && rentedItems.length)|| ((plans && plans!=='undefined') || (props.userData && props.userData.userPlanType !=="0") ) ?
        <>
          <div>
            {plans && plans!=='undefined' &&
            <>
            <h2>Plans</h2>
            <div className="itemDetails">
              <div className="itemImage">
                <img src={plans.image} alt="" />
              </div>
              <div className="itemData">
                <p>{plans.name}</p>
                <p className="cost">Price: {plans.cost}</p>
                <button onClick={removePlan}>
                  Remove
                </button>
              </div>
            </div>
            </>
            }
            {(plans!=='undefined' || (props.userData && props.userData.userPlanType !=="0")) && rentedItems && rentedItems.length>0 &&  <h2>Rented Products</h2>}
            {(plans!=='undefined' || (props.userData && props.userData.userPlanType !=="0")) && rentedItems && rentedItems.length>0 && rentedItems.map((item) => {
              return (
                <div className="itemDetails">
                  <div className="itemImage">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="itemData">
                    <p>{item.name}</p>
                    <button onClick={() => props.addToCart(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            {buyoutItems && buyoutItems.length>0 && <h2>Buyout Products</h2>}
            {buyoutItems && buyoutItems.length>0 && buyoutItems.map((item) => {
              return (
                <div className="itemDetails">
                  <div className="itemImage">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="itemData">
                    <p>{item.name}</p>
                <p className="cost">Price: {item.cost}</p>

                    <button onClick={() => props.addToCart(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}


          </div>
          <div className="deliveryDetails">
            <div className="sidebar-total">
              <div className="deliveryTruck">
                <img src={sigma} alt="" />
              </div>
              <div>
                <div>Amount</div>
                <div></div>
              </div>
              <div>{total}</div>
            </div>
            <div className="sidebar-total">
              <div className="deliveryTruck">
                <img src={deliveryTruck} alt="" />
              </div>
              <div>
                <div>Delivery</div>
                <span>Saturday/Sunday</span>
              </div>
              <div>Check in next step</div>
            </div>
            <div className="sidebar-footer">
              {/* <button  onClick={redirecToPaytm}>Pay Now</button> */}
              <button  onClick={showDeliveryData}>Checkout</button>
            </div>
          </div></>
          : <div>No Products in the cart. {props.userData && props.userData.userPlanType ==="0"? `Please buy Plans to continue. To buy best suitable plans click `: ""}{props.userData && props.userData.userPlanType ==="0"?<span className="here" onClick={redirectToPlans}>HERE</span>: null }</div>}

      

    </div>
          {((buyoutItems && buyoutItems.length>0) ||(rentedItems && rentedItems.length>0) || plans) && showProfile ? <DeliveryData userData={props.userData} redirecToPaytm={redirecToPaytm} total={buyoutTotal} setPinCode={setthePinCode} rentedItemsPresent={(rentedItems && rentedItems.length>0)? true: false}/> :null}
    </>
  );
};
export default Checkout;
