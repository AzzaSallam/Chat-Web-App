import classes from '../Style/MainChat.module.css';
import NavBarChat from './NavBarChat';
import InputSend from './InputSend';
import Messages from './Messages';

const MainChat = () => {


  return (
    <div className={classes.container}>
      <div>
        <NavBarChat/>
        <div className={classes.mainChat}>
          <Messages/>
        </div>
        <InputSend/>
      </div>
    </div>
  )
}

export default MainChat