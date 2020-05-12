import React from 'react';
import RouteNode from './RouteNode';
import RouteNodeDivider from './RouteNodeDivider';
import './RouteVisualiser.scss';

function RouteVisualiser({ route, onRemoveRouteNode}) {
  const nodes = [];

  route.forEach((x, index) => {
    nodes.push(
      <RouteNode
        key={x._id}
        node={x}
        onRemoveNode={onRemoveRouteNode}
      />
    );

    if (index !== route.length - 1) {
      nodes.push(<RouteNodeDivider key={`${x._id}divider`}/>);
    }
  });

  return (
    <div className="RouteVisualiser">
      {nodes.length > 0
        ? nodes
        : 'Route is empty'
      }
    </div>
  )
}

export default RouteVisualiser;
