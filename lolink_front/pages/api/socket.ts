import { io } from 'socket.io-client';

const URI = 'http://localhost:5555'

export const socket = io(URI, {
  autoConnect: false,
});

export const socketPrivate = io(`${URI}/private`, {
  autoConnect: false,
});
