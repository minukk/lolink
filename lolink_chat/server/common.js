// const User = require('../models/User');

// const common = (io) => {
//   io.use(async (socket, next) => {
//     console.log('여기는?!!!');
//     const userId = socket.handshake.auth.userId;
//     const nickname = socket.handshake.auth.nickname;
    
//     if (!userId) {
//       console.log('유저 아이디가 없습니다.');
//       return next(new Error('유저 아이디가 없습니다.'));
//     }

//     socket.userId = userId;
//     await findOrCreateUser(socket.userId, socket.id, nickname);
//     next();
//   })

//   io.on('connection', async (socket) => {
//     // console.log('여기는?!!!');
//     // io.sockets.emit('user_list', await User.find({}));

//     socket.on('disconnect', async () => {
//       await User.findOneAndUpdate({ userId: socket.userId }, { status: false });
//       // io.sockets.emit('user_list', await User.find({}));
//       console.log('사용자 연결 해제:', socket.id);
//     });
//   });
// };

// async function findOrCreateUser(userId, socketId, nickname) {
//   if (userId === null) return;

//   const document = await User.findOneAndUpdate(
//     { _id: userId },
//     { nickname: nickname },
//     { status: true }
//   );

//   if (document) return document;

//   return await User.create({
//     _id: userId,
//     status: true,
//     userId: userId,
//     socketId: socketId,
//     nickname: nickname,
//   });
// }

// module.exports.commoninit = common;
