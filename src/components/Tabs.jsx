import React, {useState, useEffect} from 'react';
import MenuList from "./MenuList";
import '../styles/tabs.scss'
import { useHistory } from "react-router-dom";


const Tabs = (props)=>{
    const [activeTab, setActiveTab] = useState("Library")
    const [buyoutItems, setBuyoutItems] = useState([]);
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0)
  })
    const setTabActive=(tabName)=>{
        if(tabName!==activeTab){
            setActiveTab(tabName)
            history.push({
                state: { filteredData: tabName },
              });
              props.changeCategory()
        }
    }
    
    return(<div>
        <div className="Tabs">
            <div className={`tabButton ${activeTab === "Library" ? 'active': ""}`} onClick={()=>setTabActive("Library")}>Library</div>
            <div className={`tabButton ${activeTab === "Buyout" ? 'active': ""}`} onClick={()=>setTabActive("Buyout")}>Buyout</div>

        </div>
            <MenuList 
            addToCart={props.addToCart} 
            items={props.items} 
            showPrices={activeTab === "Buyout" ? true: false}
            changeCategory={props.changeCategory}
            ></MenuList>
            </div>
    )   
}
export default Tabs;