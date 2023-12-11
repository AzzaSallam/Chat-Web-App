import React from 'react';

import Sidebar from '../Component/Sidebar';
import MainChat from '../Component/MainChat';
import classes from '../Style/Home.module.css';

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.sidebar}>
        <Sidebar/>
      </div>
      <div className={classes.mainChat}>
        <MainChat/>
      </div>
    </div>
  )
}

export default Home