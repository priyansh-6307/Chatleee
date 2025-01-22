import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { IoMdSend } from 'react-icons/io';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const socket = io('http://localhost:2000');

const Chatfooter = () => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

 

  const handleSetMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('username'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="w-full bg-zinc-900 p-3 relative">
      <form
        className="flex items-center gap-3"
        onSubmit={handleSetMessage}
      >
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl text-gray-300 hover:text-white focus:outline-none"
        >
          <FaRegSmile />
        </button>

   
        {showEmoji && (
          <div className="absolute bottom-[70px] left-4 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          type="text"
          className="flex-grow bg-zinc-800 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring focus:ring-green-600"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
      
        />

      
        <button
          type="submit"
          className="flex items-center justify-center bg-green-700 text-white p-3 rounded-full hover:bg-green-600 focus:ring focus:ring-green-600 transition-all"
        >
          <IoMdSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chatfooter;
