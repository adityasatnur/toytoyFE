import React from "react";
import Delete from '../assets/icons/delete.png';
import '../styles/sidebarCartItem.scss'

const SidebarCartItem = (props) => {
    return(
        <div className="SidebarCartItem">
            <div style={{backgroundImage: `url(${props.item.image})`}}></div>
            <div className="itemDetails">
            <p>1</p>
            <p>x</p>
            <p>{props.item.name}</p>
            </div>
             <p>{props.item.cost}</p> 
             {props.hideRemoveButton ? <img className="delete" onClick={() => props.addToCart(props.item._id)} src={Delete}/> : null}
        </div>
    )
}

export default SidebarCartItem;