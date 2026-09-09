import React from 'react';
import classNames from 'classnames';
import './Button.css';

const Button = ({ children, variant = 'primary', className, ...props }) => {
  return (
    <button 
      className={classNames('btn', `btn-${variant}`, className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
