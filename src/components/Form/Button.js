import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn('btn btn-primary', className)}
      type="button"
    >
      {children}
    </button>
  )
}

Button.propsTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
