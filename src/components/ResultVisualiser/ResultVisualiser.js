import cn from 'classnames';
import SearchTypeEnum from 'components/Settings/SearchTypeEnum';
import React from 'react';

function ResultVisualiser({ className = undefined, result, searchType }) {
  if (searchType === SearchTypeEnum.SHORTEST_STRICT_PATH) {
    return (
      <div className={cn('ResultVisualiser', className)}>
        {result.isPathFound
          ? `Delivery cost: ${result.pathWeight}`
          : 'No Such Route'
        }
      </div>
    )
  }

  if (searchType === SearchTypeEnum.ALL_PATHS) {
    return (
      <div className={cn('ResultVisualiser', className)}>
        The number of possible delivery routes: &nbsp;
        { result.count }
      </div>
    )
  }

  return null;
}

export default ResultVisualiser;
