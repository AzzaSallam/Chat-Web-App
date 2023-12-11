import React from 'react';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db, storage} from '../firebase';

import classes from '../Style/Form.module.css';
import { MdAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const RegisterForm = () => {

  const navigate = useNavigate();

  const onSubmitHandller =async (e)=>{
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const img = e.target[3].files[0];
    
    try{
      //Create user
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      //upload image
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.log(error)
        }, 
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            console.log('File available at', downloadURL);
            await updateProfile(credential.user , {
              displayName : name , 
              photoURL : downloadURL
            });
            await setDoc(doc(db , "users" , credential.user.uid) , {
              uid : credential.user.uid,
              displayName : name ,
              email ,
              photoURL : downloadURL
            });

            await setDoc(doc(db , "userChats" , credential.user.uid) , {});

            navigate('/')
          });
          console.log("every thing is done")
        }
      );
      }catch(err){
        console.log(err)
      }
  
  };

  

  return (
      <form onSubmit={onSubmitHandller} className={classes.form}>
        <h1 className={classes.label}>
          Sign Up
        </h1>
        {/* UserName input */}
        <div className={classes.inputDiv}>
          <label htmlFor="username" 
                className={classes.inputLabel}>
            Username
          </label>
          <input type='text' 
                  placeholder='Your UserName' 
                  id='username' 
                  className={classes.input}
          />
        </div>
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
        {/* User Photo */}
        <div className={classes.inputDiv}>
          <label htmlFor="userimg" 
                  className={classes.inputLabel}>
              Avatar
          </label>
          <input type='file' 
                  placeholder='Your Avatar' 
                  id='userimg' 
                  className={classes.input} 
          />
          <MdAddPhotoAlternate className={classes.icon} />
        </div>
        <button className={classes.btn}>Sign Up</button>
        <p className={classes.text}> 
          Already have an account ? 
          <Link to='/login' className={classes.link}> Sign In</Link>
        </p>
      </form>
  )
}

export default RegisterForm ;