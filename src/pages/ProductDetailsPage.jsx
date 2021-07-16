import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/ProductDetailsPage.scss";

const ProductDetailsPage = (props) => {
  const history = useHistory();
  const itemData = history.location.state.item;
  const [addedToCart, setAdeedToCart] = useState(false)
  const addToCart = ()=>{
    props.addToCart(itemData._id);
  }

const {cartItems} = props;
    useEffect(() => {
         let a = false;
        scrollTo(0,0);
         cartItems.forEach(cartItem=>{
            if(cartItem._id===itemData._id){
                a = true;
            }
          })
        a ? setAdeedToCart(true) :setAdeedToCart(false)
    }, [cartItems])
  return (
    <div className="ProductDetailsPage">
        <div className="ProductDetailsPage-imageBox">

            <img src={itemData.image} alt="" />
        </div>
      <div className="ProductDetailsPage-rightBox">
          <div className="item-name">{itemData.name}</div>
            {/* <div className="item-type">{itemData.type}</div> */}
            <div className="item-toySet">{itemData.toySet}</div>
            <div className="item-description">{itemData.itemDescription}</div>
            <div className={`button-addToCart ${addedToCart ? 'added': ""}`}><button onClick={addToCart}>{addedToCart? "Remove from Cart":"Add to Cart"}</button></div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
