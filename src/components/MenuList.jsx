
import React from 'react';
import MenuListItem from './MenuListItem';
import '../styles/menuList.scss'

const MenuList = () => {
return(<>
    <div className="MenuList">
        <p>Popular Toys</p>
        <div>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        <MenuListItem></MenuListItem>
        </div>
    </div>
    </>
)
}
export default MenuList;