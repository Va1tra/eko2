import Settings from 'components/Settings/Settings';
import Spinner from 'components/Spinner/Spinner';
import RoutesContext from 'context/RoutesContext';
import React from 'react';
import { compose } from 'utils/utils';

function RouteCostPage({ isLoading, cities }) {
  if (isLoading) {
    return (<Spinner />);
  }

  return (
    <Settings cities={cities} />
  )
}

export default compose(
  RoutesContext.withProvider,
  RoutesContext.withContext(['cities', 'isLoading']),
  React.memo
)(RouteCostPage);
