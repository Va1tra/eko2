import RouteVisualiser from 'components/RouteVisualiser/RouteVisualiser'
import Settings from 'components/Settings/Settings';
import Spinner from 'components/Spinner/Spinner';
import RoutesContext from 'context/RoutesContext';
import React from 'react';
import { compose } from 'utils/utils';

function RouteCostPage({ addRouteNode, cities, isLoading, removeRouteNode, route }) {
  if (isLoading) {
    return (<Spinner />);
  }

  return (
    <React.Fragment>
      <RouteVisualiser
        route={route}
        onRemoveRouteNode={removeRouteNode}
      />
      <Settings
        cities={cities}
        className="mt-3"
        onAddRouteNode={addRouteNode}
        route={route}
      />
    </React.Fragment>
  )
}

export default compose(
  RoutesContext.withProvider,
  RoutesContext.withContext(['addRouteNode', 'cities', 'isLoading', 'removeRouteNode', 'route']),
  React.memo
)(RouteCostPage);
