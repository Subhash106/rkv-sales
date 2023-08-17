import { string } from 'prop-types';
import React from 'react';

import './style.css';

const Button = props => {
  const { className, children, ...otherProps } = props;
  const classes = `btn ${className}`;
  return (
    <button className={classes} {...otherProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: string,
  children: string.isRequired
};

Button.defaultProps = {
  className: ''
};

export default Button;
