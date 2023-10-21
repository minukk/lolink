import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
};

const Buttons: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}) => {
  const buttonClasses = classNames(
    'inline-flex items-center justify-center font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'text-sky border border-sky hover:text-white hover:bg-primary focus:ring-indigo-500': color === 'primary',
      'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500': color === 'secondary',
      'px-4 py-2 text-sm': size === 'small',
      'px-6 py-3 text-base': size === 'medium',
      'px-8 py-4 text-lg': size === 'large',
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Buttons;