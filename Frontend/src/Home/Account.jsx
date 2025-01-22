import React, { useEffect, useState,useRef } from 'react'
import Chatbar from '../Chat/Chatbar';
import Chatbody from '../Chat/Chatbody';
import Chatfooter from '../Chat/Chatfooter,';

const Account = ({socket}) => {
    const [messages,setmessages]=useState([]);
  
    const lastMessageref=useRef(null);
    useEffect(() => {

       
        const handleMessageResponse = (data) => {
            console.log("received message", data);
            setmessages((prevMessages) => [...prevMessages, data]);
        };
        socket.on('messageResponse',handleMessageResponse)
    

        return () => socket.off('messageResponse', handleMessageResponse);
    }, [socket]);
    
    useEffect(()=>{
        lastMessageref.current?.scrollIntoView({behavior:'smooth'},[messages])
    })
  
    

  return (
    <div className='chat w-[100%] h-[100vh] flex items-center'>
        <Chatbar socket={socket}/>
        <div className='chat__main h-[100%] flex-[0.8]'>
            <Chatbody messages={messages} lastMessageref={lastMessageref}/>
            <Chatfooter socket={socket}/>
        </div>
    </div>
  )
}

export default Account;