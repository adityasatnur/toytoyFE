import React from "react";
import toy from '../assets/images/toy.jpeg';
import '../styles/sidebarCartItem.scss'

const SidebarCartItem = (props) => {
    console.log(props)
    return(
        <div className="SidebarCartItem">
            <div style={{backgroundImage: `url(${props.item.image})`}}></div>
            <div className="itemDetails">
            <p>1</p>
            <p>x</p>
            <p>{props.item.name}</p>
            </div>
            {/* <p>30/-</p> */}
        </div>
    )
}

export default SidebarCartItem;