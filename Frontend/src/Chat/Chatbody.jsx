import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";


const Chatbody = ({ messages, lastMessageref }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainheader w-full h-[10vh] flex items-center justify-between p-5 bg-zinc-900 text-white">
        <p className="text-xl font-semibold">Chatlee</p>
        <button
          onClick={handleLeaveChat}
          className="border-none outline-none p-[8px] text-center text-[20px] bg-blue-600 cursor-pointer text-white rounded-md hover:bg-red-500"
        >
         <BiLogOut />
        </button>
      </header>

      <div
        className="Message__container w-full h-[80vh] bg-chat-bg p-5 overflow-y-scroll bg-zinc-950"
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        <style>
          {`
            .Message__container::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}
        </style>

        {messages.map((message) =>
          message.name === localStorage.getItem('username') ? (
            <div className="flex justify-end mb-3" key={message.id}>
              <div className="bg-green-500 text-white px-4 py-2 rounded-xl rounded-br-none max-w-[60%] shadow-md">
                <p className="text-sm">{message.text}</p>
                <p className="text-[10px] text-right text-gray-200 mt-1">You</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-start mb-3" key={message.id}>
              <div className="bg-gray-300 text-black px-4 py-2 rounded-xl rounded-bl-none max-w-[60%] shadow-md">
                <p className="text-sm">{message.text}</p>
                <p className="text-[10px] text-right text-gray-600 mt-1">{message.name}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status text-gray-400 italic text-sm">
          <p></p>
        </div>

        <div ref={lastMessageref} />
      </div>
    </>
  );
};

export default Chatbody;
