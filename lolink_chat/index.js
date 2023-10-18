const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const common = require('./server/common');
const privateChat = require('./server/private');

const MONGO_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB 연결 성공'))
.catch((err) => console.error(err));

// common.commoninit(io);
privateChat.privateChatinit(io);

const PORT = 5555;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 시작되었습니다.`);
});
