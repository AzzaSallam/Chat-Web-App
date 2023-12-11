import React from 'react';
import NavBarSide from './NavBarSide';
import Search from './Search';
import Header from './Header';
import Chats from './Chats';
import classes from '../Style/SideBar.module.css';

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <NavBarSide/>
            <Search/>
            <Header/>
            <Chats/>
        </div>
    );
}

export default Sidebar;