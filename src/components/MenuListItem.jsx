import React, { useState } from "react";
import toy from '../assets/images/toy.jpeg';
import '../styles/menuListItem.scss';

const MenuListItem = (props) => {
    const [selected, setSelected] = useState(false)
    const addToCart=()=>{
        setSelected(!selected)
        props.addToCart("ID")
    }
return(
    <div className={`MenuListItem ${selected && "added"}`}>
        <div style={{backgroundImage: `url(${toy})`}}></div>
        <div className="itemName">Soft Toy blue</div>
        <button onClick={addToCart}>{selected ? "Added to Cart": "Add to Cart"}</button>
    </div>
)
}
export default MenuListItem;
