import Button from 'components/Form/Button';
import ResultVisualiser from 'components/ResultVisualiser/ResultVisualiser';
import RouteVisualiser from 'components/RouteVisualiser/RouteVisualiser'
import Settings from 'components/Settings/Settings';
import Spinner from 'components/Spinner/Spinner';
import RoutesContext from 'context/RoutesContext';
import React from 'react';
import { compose } from 'utils/utils';

function RouteCostPage({ addRouteNode, calculate, cities, isLoading, removeRouteNode, result, route, settings, setNoExtraStops }) {
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
        onNoExtraStopsChange={setNoExtraStops}
        route={route}
        settings={settings}
      />

      <Button className="mt-3" onClick={calculate}>
        Calculate
      </Button>

      <ResultVisualiser className="mt-3" result={result} />
    </React.Fragment>
  )
}

export default compose(
  RoutesContext.withProvider,
  RoutesContext.withContext([
    'addRouteNode',
    'calculate',
    'cities',
    'isLoading',
    'removeRouteNode',
    'result',
    'route',
    'settings',
    'setNoExtraStops',
  ]),
  React.memo
)(RouteCostPage);
