import PropTypes from 'prop-types';
import React from 'react';

function Select({ onChange, options, selectedValue }) {
  return (
    <select className="custom-select" onChange={onChange}>
      {options.map(({ label, value }) => (
        <option
          key={value}
          selected={value === selectedValue}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
};

export default Select;
