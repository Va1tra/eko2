import cn from 'classnames';
import React from 'react';

function Input({ className, onChange, onChangeValue, type, ...props }) {
  return (
    <input
      {...props}
      className={cn('form-control', className)}
      onChange={event => {
        if (onChange) {
          onChange(event);
        }

        if (onChangeValue) {
          onChangeValue(event.target.value);
        }
      }}
      type={type}
    />
  )
}

export default Input;
