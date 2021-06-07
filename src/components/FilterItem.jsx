
import React, { useState } from 'react';
import Sports from "../assets/icons/sports.png";
import '../styles/filterItems.scss'

const FilterItem = ({item, addFilter, removeFilter}) => {
    const [filterActive, setFilterActive] = useState(false);
    const filterClickHandler = ()=>{
        let toggleFilter =!filterActive;
        if(toggleFilter){
            addFilter(item.categoryName)
        }else{
            removeFilter(item.categoryName);
        }
        setFilterActive(toggleFilter);
    }
return(
    <div className={`FilterItem ${filterActive ? 'selected':''}`} onClick={filterClickHandler}>
        <img src={item.categoryImage} alt=""/>
        <p>{item.categoryName}</p>
    </div>
)
}
export default FilterItem;