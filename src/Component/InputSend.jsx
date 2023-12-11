import React from 'react';
import classes from '../Style/InputSend.module.css';
import { BiSolidSend } from "react-icons/bi";
import { RiImageAddFill } from "react-icons/ri";

import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



const InputSend = () => {

    const [text , setText] = useState("");
    const[img , setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const enterHandler = (e)=>{
        e.code === "Enter" && sendHandler();
    }

    const sendHandler = async ()=>{
        console.log("First")
        if(img){
            const storageRef = ref(storage , uuid());
            const uploadTask = uploadBytesResumable(storageRef , img);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    console.log('Upload is done');
                }, 
                (error) => {
                console.log(error)
                }, 
                ()=> {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateDoc(doc(db , "chats" , data.chatId) , {
                            messages : arrayUnion({
                                id: uuid(),
                                text , 
                                senderId : currentUser.uid,
                                date : Timestamp.now(),
                                img:downloadURL,
                            })
                        })
                })},
                console.log("every thing is done")
            )
        }else{
            await updateDoc(doc(db , "chats" , data.chatId) , {
                messages : arrayUnion({
                    id: uuid(),
                    text , 
                    senderId : currentUser.uid,
                    date : Timestamp.now()
                })
            })
            console.log(text)
        }

        await updateDoc(doc(db , "userChats" , currentUser.uid) ,{
            [data.chatId + ".lastMessage"]:{
                text,
            },
            [data.chatId + ".date"] : serverTimestamp(),
        });

        await updateDoc(doc(db , "userChats" , data.user.uid) ,{
            [data.chatId + ".lastMessage"]:{
                text,
            },
            [data.chatId + ".date"] : serverTimestamp(),
        });

        setText("");
        setImg(null)
    }

    return (
        <div className={classes.container}>
            <input type='text' 
                    placeholder='Type something ....' 
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={enterHandler}
                    className={classes.input}
            />
            <div className={classes.icons}>
                <div className={classes.icon}>
                    <input type='file' 
                            style={{display:'none'}} 
                            id='file' 
                            onChange={(e)=>setImg(e.target.files[0])} 
                    />
                    <label htmlFor='file'>
                        <RiImageAddFill />
                    </label>
                </div>
                <BiSolidSend className={classes.icon} onClick={sendHandler} />
            </div>
        </div>
    )
}

export default InputSend;