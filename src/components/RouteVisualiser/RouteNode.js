import PropTypes from 'prop-types';
import React from 'react';
import './RouteNode.scss';

function RouteNode({ node, onRemoveNode }) {
  return (
    <div className="RouteNode alert alert-warning">
      {node.city}
      <button
        aria-label="Close"
        className="close"
        onClick={() => onRemoveNode(node._id)}
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

RouteNode.propTypes = {
  node: PropTypes.shape({
    _id: PropTypes.number,
    city: PropTypes.string
  }).isRequired,
  onRemoveNode: PropTypes.func.isRequired,
};

export default RouteNode;
