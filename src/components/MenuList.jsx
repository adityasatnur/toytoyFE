
import React from 'react';
import MenuListItem from './MenuListItem';
import '../styles/menuList.scss'

const MenuList = (props) => {

return(<>
    <div className="MenuList">
        {/* <p>Popular Toys</p> */}
        <select onChange={props.changeCategory}>
            <option value="All">All</option>
            <option value="toy">Toys</option>
            <option selected={true} value="book">Book</option>
        </select>
        <div>
            {props.items.map((item)=>{
            if(item.inventory > 0){
            return <MenuListItem addToCart={props.addToCart} item={item} key={item._id} showPrices={props.showPrices}></MenuListItem>
            }
        }
            )}
        </div>
    </div>
    </>
)
}
export default MenuList;