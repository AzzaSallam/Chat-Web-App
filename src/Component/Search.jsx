import React, { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import classes from '../Style/Search.module.css';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Search = () => {
  const [userName , setUserName] = useState('');
  const[user , setUser] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext); 


  //handell Search 
  useEffect(()=>{
      const handelSearch =async ()=>{
        const q = query(
          collection(db , 'users'),
          where("displayName" , "==" , userName)
        );
        try {
          const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser(doc.data())
            });
        } catch (error) {
          console.log(error)
        }
      }

      if(userName.length !== 0){
        handelSearch();
      }
  } , [userName])

  const createChatHandller =async(user)=>{
    //Check if chat exists in firestore , if not create it 
    const combinedId = currentUser.uid > user.uid ? 
                        currentUser.uid + user.uid :
                        user.uid + currentUser.uid ;  
    try {
      const res = await getDoc(doc(db , "chats" , combinedId));
      if(!res.exists()){
        //create a chat in chats collection(Contain messages in every chat)
        await setDoc(doc(db , "chats" , combinedId) , { messages :[] } );
        //create user chats (chats which belong to every user (current user) ang its info)
        await updateDoc(doc(db , "userChats" , currentUser.uid) , {
          [combinedId+".userInfo"]: {
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
        }      
        );
        //Do the same for other user
        await updateDoc(doc(db , "userChats" , user.uid) , {
          [combinedId+".userInfo"]: {
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
        }
        );
        dispatch({type : "CHANGE_USER" , payload :user});
      }
    } catch (error) {
      console.log(error)
    }
    
    setUserName('');
    setUser(null);
    console.log(user);
  }


  return (
    <div>
      <div className={classes.search}>
        <IoIosSearch className={classes.icon}/>
        <input type='text' 
                placeholder='Search for users' 
                onChange={(e)=>setUserName(e.target.value)}
                value={userName}
                className={classes.input}
        />
      </div>
      {user && <div onClick={()=>createChatHandller(user)} className={classes.chat}>
                  <img src={user.photoURL} alt='' className={classes.img }/>
                  <div className={classes.userInfo}>
                    <span className={user.name}>{user.displayName}</span>
                  </div>
                </div>
      }
    </div>
  )
}

export default Search;