const Chat = require('../models/Chat');
const Room = require('../models/Room');
const User = require('../models/User');

const privateChat = (io) => {
  io.of('/private').use(async (socket, next) => {
    console.log('여기는?!!! ddd');
    const userId = socket.handshake.auth.userId;
    const nickname = socket.handshake.auth.nickname;
    
    if (!userId) {
      console.log('유저 아이디가 없습니다.');
      return next(new Error('유저 아이디가 없습니다.'));
    }

    socket.userId = userId;
    await findOrCreateUser(socket.userId, socket.id, nickname);
    next();
  })
  // 채팅 서버 유저 확인.
  // io.of('/private').use(async (socket, next) => {
  //   console.log('여기는???');
  //   const userId = socket.handshake.auth.userId;
    
  //   if (!userId) {
  //     console.log('유저 아이디가 없습니다.');
  //     return next(new Error('유저 아이디가 없습니다.'));
  //   }

  //   socket.userId = userId;
  //   next();
  // });

  // 내가 속해 있는 채팅방 찾기. (여러개.)
  // io.of('/private').on('connection', async (socket) => {
    
  // });

  // 채팅방 연결. 채팅 리스트 찾기?
  io.of('/private').on('connection', async (socket) => {
    console.log('접속');
    socket.on('my-chat-room', async () => {
      const userId = socket.userId;

      const myChatRoom = await findMyChat(userId);
      console.log(myChatRoom);

      if (!myChatRoom) {
        return;
      }

      io.of('/private').emit('chat-room-list', {
        room: myChatRoom
      });
    });

    socket.on('chatInit', async (res) => {
      const { buyerId, sellerId, productId } = res;

      const privateRoom = await getRoomNumber(buyerId, sellerId, productId);

      if (!privateRoom) {
        return;
      }

      const chatList = await Chat.find({ roomNumber: privateRoom._id }).exec();
      console.log(chatList);

      io.of('/private').to(privateRoom._id).emit('private-chat-init', {
        chat: chatList,
      });
    });

    socket.on('privateChat', async (res) => {
      const { chat, fromUserId, toUserId, productId, time } = res;
      const privateRoom = await getRoomNumber(fromUserId, toUserId, productId);

      if (!privateRoom) {
        return;
      }
      console.log('chat:::', chat);
      // 채팅 시간 저장?
      socket.broadcast.in(privateRoom._id).emit('private-chat', {
        chat: chat,
        fromUserId: fromUserId,
        toUserId: toUserId,
        productId: productId,
        time: time
      });

      // 채팅 내용 저장.
      await createChatDocument(privateRoom._id, res);
    });

    // 1:1 대화방이 없을 경우 대화방 생성.
    socket.on('reqJoinRoom', async (res) => {
      const { fromUserId, toUserId, productId } = res;

      console.log(res);

      if (!fromUserId || !toUserId || !productId) {
        return;
      }
      
      let privateRoom = await getRoomNumber(fromUserId, toUserId, productId);
      console.log('room', privateRoom);
      // 1:1 대화방이 없으면 생성.
      if (!privateRoom) {
        privateRoom = `${fromUserId}-${toUserId}-${productId}`;
        console.log(privateRoom);
        await findOrCreateRoom(privateRoom, res);
      }
      // 있으면 기존의 대화방 접속.
      else {
        privateRoom = privateRoom._id;
      }
      socket.join(privateRoom);
      io.of('/private').to(toUserId).emit('chat-alert', { roomNumber: privateRoom });
    });

    socket.on('resJoinRoom', (res) => {
      socket.join(res);
    });
  });
};

// client에서 대화방 나가기 요청이 들어왔을때 대화방 종료
// close: true로 바뀌지만 데이터는 남아있음.
// deleteChatRoom 

// mongodb 
async function findOrCreateUser(userId, socketId, nickname) {
  if (userId === null) return;

  const document = await User.findOneAndUpdate(
    { _id: userId },
    { nickname: nickname },
    { status: true }
  );

  if (document) return document;

  return await User.create({
    _id: userId,
    status: true,
    userId: userId,
    socketId: socketId,
    nickname: nickname,
  });
}

async function getRoomNumber(fromId, toId, productId) {
  return (
    await Room.findOne({ _id: `${fromId}-${toId}-${productId}`, close: false })
        || Room.findOne({ _id: `${toId}-${fromId}-${productId}`, close: false })
  );
};

async function findOrCreateRoom(room, res) {
  // console.log('룸 생성', res);
  if (room === null) {
    return;
  }

  const document = await Room.findById(room);

  if (document) {
    return document;
  }

  return await Room.create({
    _id: room,
    title: res.title,
    buyerId: res.fromUserId,
    buyerNickname: res.fromUserNickname,
    sellerId: res.toUserId,
    sellerNickname: res.toUserNickname,
    productId: res.productId,
    productPrice: res.productPrice,
    close: false,
  });
};

async function createChatDocument(roomNumber, res) {
  if (roomNumber === null) {
    return;
  }

  return await Chat.create({
    roomNumber: roomNumber,
    fromUserId: res.fromUserId,
    toUserId: res.toUserId,
    productId: res.productId,
    chat: res.chat,
    time: res.time,
  });
};


async function findMyChat(userId) {
  if (userId === null) return;
  console.log(userId);
  
  try {
    return await Room.find(
      { $or: [{ buyerId: userId }, { sellerId: userId }] },
      { close: false });
  } catch (error) {
    console.error('유저 채팅방 데이터를 가져오는데 에러가 발생했습니다.', error);
    throw error;
  }
  
}

async function deleteChatRoom(roomNumber) {
  await Room.findOneAndUpdate({ roomNumber: roomNumber }, { close: true });
}

module.exports.privateChatinit = privateChat;
