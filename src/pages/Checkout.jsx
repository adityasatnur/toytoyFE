import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Checkout.scss";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import sigma from "../assets/icons/sigma.png";

const Checkout = (props) => {
  const history = useHistory();
const removePlan=()=>{

}
  return (
      
    <div className="Checkout">
        {history.location.state.items &&
        <>
      <div>
        {history.location.state.items.map((item) => {
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
          <div>1</div>
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
          <button>Checkout</button>
        </div>
      </div></>}
    
      {history.location.state.plans &&
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
          <button>Checkout</button>
        </div>
      </div></>}

    </div> 
  );
};
export default Checkout;
