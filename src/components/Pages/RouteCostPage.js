import Button from 'components/Form/Button';
import RouteVisualiser from 'components/RouteVisualiser/RouteVisualiser'
import Settings from 'components/Settings/Settings';
import Spinner from 'components/Spinner/Spinner';
import RoutesContext from 'context/RoutesContext';
import React from 'react';
import { compose } from 'utils/utils';
import ResultVisualiser from 'components/ResultVisualiser/ResultVisualiser';

function RouteCostPage(props) {
  if (props.isLoading) {
    return (<Spinner />);
  }

  return (
    <React.Fragment>
      <RouteVisualiser
        route={props.route}
        onRemoveRouteNode={props.removeRouteNode}
      />

      <Settings
        cities={props.cities}
        className="mt-3"
        onAddRouteNode={props.addRouteNode}
        onCanUseStepTwice={props.setUseStepTwice}
        onMaxPathWeightChange={props.setMaxPathWeight}
        onMaxStopsChange={props.setMaxStops}
        onSearchTypeChange={props.setSearchType}
        route={props.route}
        settings={props.settings}
      />

      <Button className="mt-3" onClick={props.calculate}>
        Calculate
      </Button>

      {props.result && (
        <ResultVisualiser
          className="mt-4"
          result={props.result}
          searchType={props.settings.searchType}
        />
      )}
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
    'setMaxPathWeight',
    'setMaxStops',
    'setSearchType',
    'setUseStepTwice',
  ]),
  React.memo
)(RouteCostPage);
