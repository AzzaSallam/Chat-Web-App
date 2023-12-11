import React, { useContext, useState } from 'react';
import {ChatContext} from '../Context/ChatContext';
import Message from './Message';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import classes from '../Style/Messages.module.css';

const Messages = () => {

    const [messages , setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "chats" , data.chatId) , (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        });

        return ()=>{
            unSub()
        }

    },[data.chatId]);

    console.log(messages)

    return (
        <div className={classes.container}>
            {
                messages.map((m)=>(
                    <Message message={m} key={m.id}/>
                ))
            }
        </div>
    )
}

export default Messages