import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import "../styles/Checkout.scss";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import sigma from "../assets/icons/sigma.png";
import axios from "axios";
import { PORT } from "../serverConfig";
import DeliveryData from "../components/DeliveryData";


const Checkout = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const [buyoutItems, setBuyoutItems] = useState(null);
  const [rentedItems, setRentedItems] = useState(null);
  const [plans, setPlans] = useState(undefined);
  const [total, setTotal]= useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const history = useHistory()
  useEffect(()=>{
    let rented = [];
    let buyout = [];
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
    
    plan && setPlans(plan)
    if(buyoutItems || plan){
      let total = 0;
      if(buyoutItems){
        buyoutItems.map((item)=>{
            total+=item.cost
        })
      }
      if(plan){
        total+=plan.cost
      }
      if(deliveryCharges > 0){
        total += deliveryCharges;
      }
      setTotal(total)
    }
  }, [localStorage.getItem('cartItems'), localStorage.getItem('plans')])

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
             //action:`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
               action:`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
          params:res
        }
      post(information)
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      //Make api call to add rental items to delivery
    }
  }
  function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  function isObj(val) {
    return typeof val === 'object'
  }
   function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
  
    Object.keys(params.data).forEach(key => {
      const input = document.createElement('input')
      // input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params.data[key]))
      form.appendChild(input)
    })
  
    return form
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
      {(buyoutItems && buyoutItems.length)|| ((plans && plans!=='undefined') || (props.userData && props.userData.userPlanType !=="0") ) ?
        <>
          <div>
            {plans!=='undefined' &&
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
                <span>2-4 Days</span>
              </div>
              <div>Free</div>
            </div>
            <div className="sidebar-footer">
              {/* <button  onClick={redirecToPaytm}>Pay Now</button> */}
              <button  onClick={showDeliveryData}>Checkout</button>
            </div>
          </div></>
          : <div>No Products in the cart. {props.userData && props.userData.userPlanType ==="0"? `Please buy Plans to continue. To buy best suitable plans click `: ""}{props.userData && props.userData.userPlanType ==="0"?<span onClick={redirectToPlans}>HERE</span>: null }</div>}

      

    </div>
          {((buyoutItems && buyoutItems.length>0) ||(rentedItems && rentedItems.length>0) || plans) && showProfile ? <DeliveryData userData={props.userData} redirecToPaytm={redirecToPaytm}></DeliveryData> :null}
    </>
  );
};
export default Checkout;
