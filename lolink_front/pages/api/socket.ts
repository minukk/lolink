import { io } from 'socket.io-client';

const URI = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5555'

export const socket = io(URI, {
  autoConnect: false,
});

export const socketPrivate = io(`${URI}/private`, {
  autoConnect: false,
});
