import React from 'react';
import SearchBar from './SearchBar'
import '../styles/Header.scss';

const Header = (props) => {
return(
    <div className="Header">
        <div className={`hamburger ${props.isSidebarOpen && "sidebar-open"}`} onClick={props.hamburgerClick}> 
            <div></div>
            <div></div>
            <div></div>
        </div>
        <SearchBar></SearchBar>
    </div>
)
}
export default Header;