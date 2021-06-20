import React, {useState, useEffect} from 'react';
import MenuList from "./MenuList";
import '../styles/tabs.scss'

const Tabs = (props)=>{
    const [activeTab, setActiveTab] = useState("Library")
    const [buyoutItems, setBuyoutItems] = useState([]);
    const setTabActive=(tabName)=>{
        if(tabName!==activeTab){
            setActiveTab(tabName)
        }
    }
    useEffect(() => {
        let buyout = props.items.filter(item=> item.purchasable === true);
        if(!props.activetab){
            scrollTo(0,0)
            setActiveTab("Buyout")
        }
        if(buyoutItems.length === 0){
            setBuyoutItems([...buyoutItems, ...buyout])
        }
        
    }, [buyoutItems])
    return(<div>
        <div className="Tabs">
            <div className={`tabButton ${activeTab === "Library" ? 'active': ""}`} onClick={()=>setTabActive("Library")}>Library</div>
            <div className={`tabButton ${activeTab === "Buyout" ? 'active': ""}`} onClick={()=>setTabActive("Buyout")}>Buyout</div>

        </div>
            <MenuList 
            addToCart={props.addToCart} 
            items={activeTab === "Library" ? props.items: buyoutItems} 
            showPrices={activeTab === "Buyout" ? true: false}
            ></MenuList>
            </div>
    )   
}
export default Tabs;