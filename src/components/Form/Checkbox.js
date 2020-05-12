import cn from 'classnames'
import PropTypes from 'prop-types';
import React from 'react';

let uniqueId = 0;

function Checkbox({ checked, className = undefined, disabled = false, label, onChangeValue }) {
  const [id] = React.useState(() => `Checkbox${++uniqueId}`);

  return (
    <div className={cn('form-check', className)}>
      <input
        className="form-check-input"
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={event => onChangeValue(event.target.checked)}
        type="checkbox"
        value=""
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Checkbox;
