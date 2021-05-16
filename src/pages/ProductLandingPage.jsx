import React, {useState, useEffect, useRef} from 'react';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import Filters from '../components/Filters';
import Tabs from '../components/Tabs';
import "../styles/ProductLandingPage.scss"

const ProductLandingPage = () => {
    const [isSidebarOpen, SetIsSideBarOpen] = useState(false);
    const sidebarRef = useRef();

    useEffect(() => {
        if(!isSidebarOpen){
            setTimeout(()=>{
                sidebarRef.current.style.display = "none";
            }, 800)
        }else{
            sidebarRef.current.style.display = "block";

        }
        
    }, [isSidebarOpen])
    const hamburgerClick = ()=>{
        SetIsSideBarOpen(!isSidebarOpen)
    }
return(<>
    <Header isSidebarOpen={isSidebarOpen} hamburgerClick={hamburgerClick}/>
    <Sidebar isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef}/>
    <div className="ProductLandingPage">
        <Filters></Filters>
        <Tabs>
        </Tabs>
    </div>
    </>
)
}
export default ProductLandingPage;