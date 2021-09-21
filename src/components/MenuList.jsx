
import React from 'react';
import MenuListItem from './MenuListItem';
import '../styles/menuList.scss'
import { useHistory } from "react-router-dom";

const MenuList = (props) => {
    const history = useHistory();
    debugger;
return(<>
    <div className="MenuList">
        {/* <p>Popular Toys</p> */}
        <select onChange={props.changeCategory}>
            <option selected={history.location.state && history.location.state.filteredData!="toy" && history.location.state.filteredData!="book"} value="All">All</option>
            <option selected={history.location.state && history.location.state.filteredData=="toy" ? true : false} value="toy">Toys</option>
            <option selected={history.location.state && history.location.state.filteredData=="book" ? true : false} value="book">Book</option>
        </select>
        <div>
            {props.items.map((item, index)=>{
            if(item.inventory > 0){
            return <MenuListItem addToCart={props.addToCart} item={item} key={item._id} showPrices={props.showPrices} key={index}></MenuListItem>
            }
        }
            )}
        </div>
    </div>
    </>
)
}
export default MenuList;