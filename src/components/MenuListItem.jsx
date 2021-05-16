import React from "react";
import toy from '../assets/images/toy.jpeg';
import '../styles/menuListItem.scss';

const MenuListItem = () => {
return(
    <div className="MenuListItem">
                    <div style={{backgroundImage: `url(${toy})`}}></div>
                    <div className="itemName">Soft Toy blue</div>

    </div>
)
}
export default MenuListItem;
