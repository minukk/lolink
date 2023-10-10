// utils/auth.ts
import { IncomingMessage } from 'http';

const isUserLoggedIn = (req: IncomingMessage): boolean => {
  const { cookie } = req.headers;
  
  if (cookie && cookie.includes('lolink=')) {
    return true;
  }

  return false;
};

export default isUserLoggedIn;
