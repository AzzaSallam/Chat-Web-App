import React from 'react';
import RegisterForm from '../Component/RegisterForm';
import classes from '../Style/Register.module.css';
import backgrungImg from '../assets/communication-social-media-icons.jpg';

const Register = () => {
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <RegisterForm/>
            </div>
            <div className={classes.imgContainer}>
                <img src={backgrungImg} className={classes.img} alt=''/>
            </div>
        </div>
    )
}

export default Register