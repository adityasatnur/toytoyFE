import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import Filters from '../components/Filters';
import Tabs from '../components/Tabs';
import "../styles/ProductLandingPage.scss";
import {PORT} from '../serverConfig';


const ProductLandingPage = () => {
    const [items, setItems] = useState([]);

    const [filteredItems, setFilteredItems] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false)

    const [cartItems, setCartItems] = useState([])
    const [isSidebarOpen, SetIsSideBarOpen] = useState(false);
    const sidebarRef = useRef();
    const [filters, setFilters]= useState([]);
    
    const addFilter = (filterName) => {
        setFilters([...filters, filterName])
    }
    const removeFilter = (filterName) => {
        let newFilter = filters.filter((item)=>filterName !== item)
        setFilters([...newFilter])
    }
    const applyFiltersHandler = (filterType)=>{
        setFilterApplied(true);
        debugger;
        let filteredItems = []
        items.filter((item)=>{
            if(filterType==='toys'){
                loop1: 
                for(let i=0;i<item.category.length;i++){
                    for(let j=0;j<filters.length;j++){

                        if(item.category[i].name===filters[j]){
                            filteredItems.push(item);
                            break loop1;
                        }
                    }
                }
            }
            else{
                for(let j=0;j<filters.length;j++){
                    if(item[filterType]===filters[j]){
                        filteredItems.push(item);
                    }
                }
            }
        })
        if(filteredItems.length === 0){
            setFilteredItems(new Array);    
        }else{

            setFilteredItems(filteredItems)
        }
    }
    const addToCart = (id)=>{
        let itemCopy = [...items]
        let findDuplicateInCart = cartItems.find((item)=>item._id===id);
        if(findDuplicateInCart===undefined){
            let newArr = itemCopy.filter((item)=>item._id===id)
            setCartItems([...cartItems, ...newArr])
        }else{
            let newArr = cartItems.filter((item)=>item._id!==id)
            setCartItems([...newArr])
        }
    }
    const getItems=async ()=>{
        await axios.get(`${PORT}/api/get/addItem`).then((res)=>{
            const arr =[...items, ...res.data]; 
            setItems(arr)
          })
    }
    useEffect( () => {
        if(!items.length && !filters.length){
            getItems();
        }
        if(!isSidebarOpen){
            setTimeout(()=>{
                sidebarRef.current.style.display = "none";
            }, 800)
        }else{
            sidebarRef.current.style.display = "block";

        }
        
    }, [isSidebarOpen, items])
    const hamburgerClick = ()=>{
        SetIsSideBarOpen(!isSidebarOpen)
    }
    console.log(items)
return(<>
    <Header isSidebarOpen={isSidebarOpen} hamburgerClick={hamburgerClick}/>
    <Sidebar isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} cartItems={cartItems}/>
    <div className="ProductLandingPage">
        <Filters addFilter={addFilter} removeFilter={removeFilter} applyFiltersHandler={applyFiltersHandler}></Filters>
        {items.length === 0 ? <p className="noItemsFound">Sorry, No items found</p>: 
        <Tabs addToCart={addToCart} items={filterApplied ? filteredItems : items}>
        </Tabs>
}
    </div>
    </>
)
}
export default ProductLandingPage;