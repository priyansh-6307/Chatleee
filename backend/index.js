const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const User = require('./routes/user');
const Message = require('./models/message');

const user = require('./models/user');


const app = express();
const PORT = process.env.PORT || 2000;



mongoose.connect('mongodb+srv://mongo:mongo@cluster0.tg0rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });



app.use(cors());
app.use(express.json());
app.use('/api/v1', User);



const server = app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});



const io= new Server(server,{
  cors:{origin:"http://localhost:5173/"}
})

io.on("connection", (socket) => {
  console.log(`${socket.id} User connected`);


socket.on('message',(data)=>{
  io.emit('messageResponse',data)
})

socket.on("disconnect",async()=>{
  console.log(`${socket.id} user Disconnnected`)
})

});
