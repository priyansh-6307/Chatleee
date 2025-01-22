import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PrivateChat = ({ socket }) => {
  const { username } = useParams();
  const [message, setMessage] = useState([]);
  const [newmessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('startPrivateChat', { username });

    socket.on('PrivateMessage', (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });

    socket.emit('getUsers');
    socket.on('userList', (fetchedUsers) => {
      setUsers(fetchedUsers);
    });

    return () => {
      socket.off('PrivateMessage');
      socket.off('userList');
    };
  }, [socket, username]);

  const sendMessage = () => {
    const currentUser = localStorage.getItem('username');

    if (newmessage.trim()) {
      const receiverSocketID =
        users?.find((u) => u.Username === username)?.socketID || null;

      const message = {
        sender: currentUser,
        receiver: username,
        text: newmessage,
        receiverSocketID,
      };

      socket.emit('sendPrivateMessage', message);
      setMessage((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Private Chat with {username}</h2>
      <div>
        {message.map((msg, index) => (
          <div key={index} className={msg.sender === username ? 'received' : 'sent'}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newmessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PrivateChat;
