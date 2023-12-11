import React from 'react';

import classes from '../Style/Messages.module.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { useRef } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';



const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    } , [message])

    console.log(message);


    return (
        <div ref={ref} 
            className={`${classes.message} ${message.senderId === currentUser.uid &&classes.owner }`}>
            <div className={classes.messInfo}>
                <img src={message.senderId === currentUser.uid 
                            ? currentUser.photoURL
                            : data.user.photoURL
                        } 
                        alt='' 
                        className={classes.img}
                />
                <Moment fromNow className={classes.time}>{message.date?.toDate()}</Moment>
            </div>
            <div className={` ${message.senderId === currentUser.uid ? classes.messContentOwner : classes.messContent} `}>
                <p className={`${message.text ? classes.text : classes.nontxt} ${message.senderId === currentUser.uid && classes.ownerTxt } `}>
                    {message.text }
                </p>
                {message.img && <img src={message.img} alt='' className={classes.imgSent}/>}
            </div>
        </div>
    )
}

export default Message