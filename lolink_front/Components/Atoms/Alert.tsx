import React, { useEffect } from 'react';
import Button from './Button';
import classNames from 'classnames';

interface AlertProps {
  message: string;
  color?: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose, color = 'primary' }) => {
  const alertClasses = classNames(
    'absolute -top-4 flex items-center justify-between max-w-md p-4 mx-auto mt-4 text-white rounded-lg w-80 left-1/2 mobile:left-6',
    {
      'text-white bg-sky': color === 'primary',
      'text-white bg-green': color === 'allow',
      'text-white bg-red': color === 'warn',
    }
  );

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={alertClasses}>
      <span>{message}</span>
      <Button color="close" onClick={onClose}>닫기</Button>
    </div>
  );
};

export default Alert;
