import React from 'react';
import cn from 'classnames';

function ResultVisualiser({ className = undefined, result }) {
  if (result) {
    return (
      <div className={cn('ResultVisualiser', className)}>
        {result.isPathFound
          ? `cost: ${result.pathWeight}`
          : 'No Such Route'
        }
      </div>
    )
  }

  return null;
}

export default ResultVisualiser;
