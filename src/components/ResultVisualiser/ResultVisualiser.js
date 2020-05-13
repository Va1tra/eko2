import React from 'react';
import cn from 'classnames';

function ResultVisualiser({ className = undefined, result }) {
  if (result) {
    return (
      <div className={cn('ResultVisualiser', className)}>
        {result.isRouteFound
          ? `cost: ${result.cost}`
          : 'No Such Route'
        }
      </div>
    )
  }

  return null;
}

export default ResultVisualiser;
