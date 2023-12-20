import React, { useState } from 'react';
import classes from '../Style/Header.module.css';
import { IoMdHome } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";


const Header = (title) => {

  const [menu , setMenu] = useState(1);

  const tabs=[{
    id :1,
    icon : <IoMdHome/>
  } , {
    id : 2,
    icon : <BsChatLeftTextFill/>
  } , {
    id : 3 ,
    icon : <HiUsers/>
  }]


  return ( 
    <div className={classes.header}>
      {tabs.map((tab)=>(
        <div key={tab.id}
            onClick={()=>setMenu(tab.id)}
            className={`${classes.icon} ${tab.id===menu && classes.active}`}
        > 
          {tab.icon}
        </div>
      ))}
    </div>
  )
}

export default Header;



{/* <div className={classes.header}>
  <IoMdHome id={1}
            onClick={()=>setMenu(1)} 
            
            className={`${classes.icon} ${menu===1 && classes.active}`}
  />
  <BsChatLeftTextFill id={2}
                      onClick={()=>setMenu(2)} 
                      
                      className={`${classes.icon} ${menu===2 && classes.active}`}
  />
  <HiUsers id={3}
          onClick={()=>setMenu(3)} 
          
          className={`${classes.icon} ${menu===3 && classes.active}`} 
  />
</div> */}