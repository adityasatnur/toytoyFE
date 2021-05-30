
import React from 'react';
import MenuListItem from './MenuListItem';
import '../styles/menuList.scss'

const MenuList = (props) => {
return(<>
    <div className="MenuList">
        <p>Popular Toys</p>
        <div>
            <MenuListItem addToCart={props.addToCart}></MenuListItem>
        </div>
    </div>
    </>
)
}
export default MenuList;