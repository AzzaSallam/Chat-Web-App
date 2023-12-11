import React from 'react';
import classes from '../Style/Header.module.css';
import { IoMdHome } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";


const Header = () => {
  return (
    <div className={classes.header}>
      <IoMdHome className={`${classes.icon} ${classes.active}`} />
      <BsChatLeftTextFill className={classes.icon} />
      <HiUsers className={classes.icon}/>
    </div>
  )
}

export default Header;