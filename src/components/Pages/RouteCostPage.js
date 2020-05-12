import Settings from 'components/Settings/Settings';
import Spinner from 'components/Spinner/Spinner';
import RoutesContext from 'context/RoutesContext';
import React from 'react';
import { compose } from 'utils/utils';

function RouteCostPage({ addRouteNode, cities, isLoading, route }) {
  if (isLoading) {
    return (<Spinner />);
  }

  return (
    <Settings
      cities={cities}
      onAddRouteNode={addRouteNode}
      route={route}
    />
  )
}

export default compose(
  RoutesContext.withProvider,
  RoutesContext.withContext(['addRouteNode', 'cities', 'isLoading', 'route']),
  React.memo
)(RouteCostPage);
