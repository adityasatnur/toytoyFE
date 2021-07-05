import React, { useState } from "react";
import toy from '../assets/images/toy.jpeg';
import '../styles/menuListItem.scss';
import { useHistory } from 'react-router-dom'


const MenuListItem = ({item, addToCart, showPrices}) => {
    const history = useHistory();

    const [selected, setSelected] = useState(false)
    const addToCartClick=()=>{
        setSelected(!selected)
        addToCart(item._id)
    }
    const routeToPDP = ()=>{
        history.push({
            pathname: '/PDP',
            state: { item: item }
          });

    }

return(
    <div className={`MenuListItem ${selected && "added"}`}>
        <div style={{backgroundImage: `url(${item.image})`}} onClick={routeToPDP}></div>
        <div className="itemName">{item.name}</div>
        {showPrices &&
        <div className="itemPrice">Amount: {item.cost} Rs.</div>}
        <button onClick={addToCartClick}>{selected ? "Added to Cart": "Add to Cart"}</button>
    </div>
)
}
export default MenuListItem;
