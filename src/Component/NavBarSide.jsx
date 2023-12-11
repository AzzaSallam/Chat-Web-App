import React, { useContext } from 'react';
import { IoIosLogOut } from "react-icons/io";
import classes from '../Style/NavBarSide.module.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../Context/AuthContext';

const NavBarSide = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className={classes.navbar}>
            <div className={classes.userInfon}>
                <img src={currentUser.photoURL} alt='' className={classes.img}/>
                <span className={classes.name}>{currentUser.displayName}</span>
            </div>
            <div>
                <IoIosLogOut onClick={()=>signOut(auth)} className={classes.icon}/>
            </div>
        </div>
    )
}

export default NavBarSide;