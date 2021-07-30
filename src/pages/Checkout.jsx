import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import "../styles/Checkout.scss";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import sigma from "../assets/icons/sigma.png";
import axios from "axios";
import { PORT } from "../serverConfig";
import Profile from './Profile'
import DeliveryData from "../components/DeliveryData";


const Checkout = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [total, setTotal]= useState(0)
  const history = useHistory();

  useEffect(()=>{
    setCheckoutItems(history.location.state.items)
    if(checkoutItems || history.location.state.plans){
      let total = 0;
      if(checkoutItems){
        checkoutItems.map((item)=>{
          if(item.purchasable){

            total+=item.cost
          }
        })
      }
      if(history.location.state.plans){
        total+=history.location.state.plans.cost
      }
      setTotal(total)
    }
  }, [history.location.state])

  const showDeliveryData = () =>{
    setShowProfile(true)
  }
  const redirecToPaytm = () => {
    let data = {
      amount: history.location.state.cartTotal,
      name: "ASDIDA12331",
      email: "adityasatnur@gmail.com",
      phone: "7558632779"
    }
    axios.post(`${PORT}/api/payment`, data)
      .then(res => {
        var information={
          // action:`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
           action:`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
        params:res
      }
    post(information)
      })
      .catch(function (error) {
        console.log(error);
      });
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
    history.push({
      state: { plans: null },
    });
  }
  return (
    <>
    <div className="Checkout">
      {(checkoutItems && checkoutItems.length) || history.location.state.plans ?
        <>
          <div>
            {checkoutItems && checkoutItems.length && checkoutItems.map((item) => {
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
            {history.location.state.plans &&
            <div className="itemDetails">
              <div className="itemImage">
                <img src={history.location.state.plans.image} alt="" />
              </div>
              <div className="itemData">
                <p>{history.location.state.plans.name}</p>
                <button onClick={removePlan}>
                  Remove
                </button>
              </div>
            </div>
         }


          </div>
          <div className="deliveryDetails">
            <div className="sidebar-total">
              <div className="deliveryTruck">
                <img src={sigma} alt="" />
              </div>
              <div>
                <div>Total</div>
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
          : <div>No Products in the cart</div>}

      {/* {history.location.state.plans &&
        <>
          <div>
            <div className="itemDetails">
              <div className="itemImage">
                <img src={history.location.state.plans.image} alt="" />
              </div>
              <div className="itemData">
                <p>{history.location.state.plans.name}</p>
                <button onClick={removePlan}>
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="deliveryDetails">
            <div className="sidebar-total">
              <div className="deliveryTruck">
                <img src={sigma} alt="" />
              </div>
              <div>
                <div>Total</div>
                <div></div>
              </div>
              <div>{history.location.state.plans.cost}</div>
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
              <button  onClick={redirecToPaytm}>Pay Now</button>
            </div>
          </div></>}

         */}
    </div>
          {((checkoutItems && checkoutItems.length) || history.location.state.plans) && showProfile ? <DeliveryData userData={props.userData} redirecToPaytm={redirecToPaytm}></DeliveryData> :null}
    </>
  );
};
export default Checkout;
