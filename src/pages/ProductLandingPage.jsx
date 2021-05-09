import React, {useState} from 'react';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';

const ProductLandingPage = () => {
    const [isSidebarOpen, SetIsSideBarOpen] = useState(false)
    const hamburgerClick = ()=>{
        SetIsSideBarOpen(!isSidebarOpen)
    }
return(<>
    <Header isSidebarOpen={isSidebarOpen} hamburgerClick={hamburgerClick}/>
    <Sidebar isSidebarOpen={isSidebarOpen}/>
    </>
)
}
export default ProductLandingPage;