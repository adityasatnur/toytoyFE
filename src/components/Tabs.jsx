import React from 'react';
import MenuList from "./MenuList";
import '../styles/tabs.scss'

const Tabs = ()=>{
    return(<div>
        <div className="Tabs">
            <div className="tabButton">Library</div>
            <div className="tabButton">Buyout</div>

        </div>
            <MenuList></MenuList>
            </div>
    )
}
export default Tabs;