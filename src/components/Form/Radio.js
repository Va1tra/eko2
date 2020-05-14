import cn from 'classnames'
import PropTypes from 'prop-types';
import React from 'react';

let uniqueId = 0;

function Radio({ checked, className = undefined, disabled = false, label, onChangeValue, ...props }) {
  const [id] = React.useState(() => `Radio${++uniqueId}`);

  return (
    <div className={cn('form-check', className)}>
      <input
        {...props}
        className="form-check-input"
        checked={checked}
        disabled={disabled}
        onChange={event => onChangeValue(event.target.value)}
        id={id}
        type="radio"
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Radio;
