import React, { useContext, useEffect, useState } from 'react'
import classes from '../Style/Chats.module.css';
import { AuthContext } from '../Context/AuthContext';
import {ChatContext} from '../Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Chats = ({title}) => {

  const [chats , setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

  useEffect(()=>{
    const getChats =()=>{
      const unsub = onSnapshot(doc(db , "userChats" , currentUser.uid) , (doc)=>{
        setChats(doc.data());
      });

      return ()=>{
        unsub();
      } 
    }
    
    currentUser.uid && getChats();

  },[currentUser.uid]);


  const selectUserHandler = (u)=>{
    dispatch({type : "CHANGE_USER" , payload :u})
  }

  return (
        <div className={classes.container}>
          {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
            <div className={classes.chat} key={chat[0]} id={chat[1].userInfo.uid} onClick={()=>selectUserHandler(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt='' className={classes.img }/>
                <div className={classes.userInfo}>
                  <span className={classes.name}>{chat[1].userInfo.displayName}</span>
                  <span className={classes.text}>{chat[1].lastMessage?.text}</span>
                </div>
            </div>
          ))}
        </div>
  )
}

export default Chats;