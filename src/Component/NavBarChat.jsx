import React, { useContext } from 'react';
import classes from '../Style/NavBarSide.module.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from '../Context/ChatContext';



const NavBarChat = () => {

    const {data} = useContext(ChatContext);

    return ( 
        <div className={classes.navbarChat}>
            <div className={classes.userInfon}>
                <img src={data.user?.photoURL} alt='' className={classes.img}/>
                <span className={classes.nameChat}>{data.user?.displayName}</span>
            </div>
            <span className={classes.iconChat}>
                <BsThreeDotsVertical />
            </span>
        </div>
        
    )
}

export default NavBarChat;