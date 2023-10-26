import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'sign' | 'close';
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'full' | 'underline';
  disabled?: boolean;
  onClick?: any;
  label?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  label = 'button',
}) => {
  const buttonClasses = classNames(
    'inline-flex items-center justify-center font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'text-primary border border-primary hover:text-white hover:bg-primary focus:ring-indigo-500': color === 'primary',
      'text-white bg-primary focus:ring-gray-500': color === 'secondary',
      'text-white bg-green hover:bg-ongreen': color === 'sign',
      'text-white outline-none': color === 'close',
      'px-4 py-2 text-sm': size === 'small',
      'px-6 py-3 text-base': size === 'medium',
      'px-8 py-4 text-lg': size === 'large',
      'py-2 w-36 mobile:w-28': size === 'xlarge',
      'py-4 w-96 mobile:w-72': size === 'full',
      'border-none underline': size === 'underline',
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled} aria-label={label}>
      {children}
    </button>
  );
};

export default Button;