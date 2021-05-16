
import React from 'react';
import Sports from "../assets/icons/sports.png";
import '../styles/filterItems.scss'

const FilterItem = (props) => {
return(
    <div className="FilterItem">
        <img src={Sports} alt=""/>
        <p>Sports</p>
    </div>
)
}
export default FilterItem;