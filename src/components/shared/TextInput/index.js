import { string } from 'prop-types';
import React from 'react';
import './style.css';

const TextInput = props => {
  const { label, id, className, ...otherProps } = props;

  const classes = `input-box ${className}`;

  return (
    <div className="text-input">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input className={classes} placeholder={label} id={id} {...otherProps} />
    </div>
  );
};

TextInput.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  className: string
};

TextInput.defaultProps = {
  label: '',
  className: ''
};

export default TextInput;
