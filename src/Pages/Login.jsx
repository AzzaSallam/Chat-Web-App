import React from 'react';
import classes from'../Style/Register.module.css';
import LoginForm from '../Component/LoginForm';
import backgrungImg from '../assets/communication-social-media-icons.jpg';

const Login = () => {
  return (
    <div className={classes.container}>
            <div className={classes.form}>
                <LoginForm/>
            </div>
            <div className={classes.imgContainer}>
                <img src={backgrungImg} className={classes.img} alt=''/>
            </div>
        </div>
  )
}

export default Login