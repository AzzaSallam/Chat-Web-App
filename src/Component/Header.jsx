import React from 'react';
import classes from '../Style/Header.module.css';
// import { IoMdHome } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";
// import { HiUsers } from "react-icons/hi2";


const Header = (title) => {
  
  return ( 
    <div className={classes.header}>
        <BsChatLeftTextFill 
              className={classes.icon}
        />
    </div>
  )
}

export default Header;


  // const [menu , setMenu] = useState(1);

  // const tabs=[{
  //   id :1,
  //   icon : <IoMdHome/>
  // } , {
  //   id : 2,
  //   icon : <BsChatLeftTextFill/>
  // } , {
  //   id : 3 ,
  //   icon : <HiUsers/>
  // }]
//<div className={classes.header}>
//</div>      {tabs.map((tab)=>(
//</div>        {/* // <div key={tab.id} */}
//</div>            onClick={()=>setMenu(tab.id)}
//</div>            className={`${classes.icon} ${tab.id===menu && classes.active}`}
//</div>        > 
//</div>          // {/* {tab.icon} */}
//</div>        // {/* </div> */}
//</div>      ))}
//</div>    // {/* </div> */}

