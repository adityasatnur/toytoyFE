
import React from 'react';
import MenuListItem from './MenuListItem';
import '../styles/menuList.scss'

const MenuList = (props) => {

return(<>
    <div className="MenuList">
        <p>Popular Toys</p>
        <div>
            {props.items.map((item)=>
            <MenuListItem addToCart={props.addToCart} item={item} key={item._id} showPrices={props.showPrices}></MenuListItem>
            )}
        </div>
    </div>
    </>
)
}
export default MenuList;