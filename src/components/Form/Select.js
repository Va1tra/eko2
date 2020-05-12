import PropTypes from 'prop-types';
import React from 'react';

function Select({ onChange, onChangeValue, options, selectedValue }) {
  return (
    <select
      className="custom-select"
      onChange={event => {
        if (onChange) {
          onChange(event);
        }

        if (onChangeValue) {
          onChangeValue(event.target.value);
        }
      }}
      value={selectedValue}
    >
      <option style={{ display: 'none' }}>
        Select next city
      </option>
      {options.map(({ label, value }) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
};

export default Select;
