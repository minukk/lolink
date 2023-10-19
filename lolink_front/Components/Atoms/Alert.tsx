import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="absolute top-0 flex items-center justify-between max-w-md p-4 mx-auto mt-4 text-white rounded-lg w-80 bg-red left-1/2">
      <span>{message}</span>
      <button onClick={onClose} className="text-xl font-bold hover:text-white focus:outline-none">&times;</button>
    </div>
  );
};

export default Alert;
