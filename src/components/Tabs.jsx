import React, {useState} from 'react';
import MenuList from "./MenuList";
import '../styles/tabs.scss'

const Tabs = (props)=>{
    const [activeTab, setActiveTab] = useState("Library")
    const setTabActive=(tabName)=>{
        if(tabName!==activeTab){
            setActiveTab(tabName)
        }
    }
    return(<div>
        <div className="Tabs">
            <div className={`tabButton ${activeTab === "Library" ? 'active': ""}`} onClick={()=>setTabActive("Library")}>Library</div>
            <div className={`tabButton ${activeTab === "Buyout" ? 'active': ""}`} onClick={()=>setTabActive("Buyout")}>Buyout</div>

        </div>
            <MenuList addToCart={props.addToCart}></MenuList>
            </div>
    )
}
export default Tabs;