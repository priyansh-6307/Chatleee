import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chatbar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http:/localhost:2000/api/v1/active-users");
      setUsers(Array.isArray(data.activeUsers) ? data.activeUsers : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUser();

    socket.on('newUserResponse', (data) => {
      setUsers(Array.isArray(data.activeUsers) ? data.activeUsers : []);
    });

    return () => socket.off('newUserResponse');
  }, [socket]);

  const currentUsername = localStorage.getItem('username');

  return (
    <div className='chat__sidebar h-[100vh] bg-zinc-900 flex-[0.2] p-[20px]  '>
      <h4 className='chat__header my-[30px] mb-[20px] text-white'>Active Users</h4>
      <div className='chat__users mb-[10px] text-white font-poppins font-[14px]'>
        {Array.isArray(users) && users.length > 0 ? (
          users
            .filter((user) => user.Username !== currentUsername)
            .map((user, index) => (
              <p
                key={user.socketID || index}
                style={{
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {user.Username || 'Unknown User'}
              </p>
            ))
        ) : (
          <p>No active users</p>
        )}
      </div>
    </div>
  );
};

export default Chatbar;
