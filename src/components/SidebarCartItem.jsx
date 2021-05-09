import React from "react";
import toy from '../assets/images/toy.jpeg';
import '../styles/sidebarCartItem.scss'

const SidebarCartItem = () => {
    return(
        <div className="SidebarCartItem">
            <div style={{backgroundImage: `url(${toy})`}}></div>
            <div className="itemDetails">
            <p>1</p>
            <p>x</p>
            <p>Stuff Toy</p>
            </div>
            <p>30/-</p>
        </div>
    )
}

export default SidebarCartItem;