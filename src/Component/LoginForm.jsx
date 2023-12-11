import React from 'react';
import classes from '../Style/Form.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginForm = () => {

  const navigate = useNavigate();

  const onSubmitHandller =async (e)=>{
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try{
      await signInWithEmailAndPassword(auth , email , password);
      navigate('/');
      }catch(err){
        console.log(err)
      }
  
  };


  return (
    <form onSubmit={onSubmitHandller} className={classes.form}>
        <h1 className={classes.label}>
          Sign In
        </h1>
        {/* Email input */}
        <div className={classes.inputDiv}>
          <label htmlFor="email" 
                  className={classes.inputLabel}>
              Email
          </label>
          <input type='email' 
                  placeholder='Yor Email' 
                  id='email' 
                  className={classes.input} 
          /> 
        </div>
        {/* password input */}
        <div className={classes.inputDiv}>
          <label htmlFor="password" 
                  className={classes.inputLabel}>
              Password
          </label>
          <input type='password' 
                  placeholder='Your Password' 
                  id='password' 
                  className={classes.input} 
          />
        </div>
        <button className={classes.btn}>Sign Up</button>
        <p className={classes.text}> 
          You haven't an account ? 
          <Link to='/register' className={classes.link}> Sign Up</Link>
        </p>
      </form>
  )
}

export default LoginForm;