import Checkbox from 'components/Form/Checkbox';
import Select from 'components/Form/Select';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';

class Settings extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddRouteNode: PropTypes.func.isRequired,
    route: PropTypes.arrayOf({ city: PropTypes.string }).isRequired,
  }

  getSelectOptions= memoize((cities, route) => {
    return cities
      .filter(city => !route.some(route => route.city === city))
      .map(city => ({ label: city, value: city}));
  })

  render() {
    const {
      cities,
      onAddRouteNode,
      route,
    } = this.props;

    return (
      <div className="Settings">
        <Select
          onChangeValue={onAddRouteNode}
          options={this.getSelectOptions(cities, route)}
          selectedValue={-1}
        />

        <Checkbox
          className="mt-1"
          label="No extra stops"
        />

        <Checkbox
          className="mt-1"
          label="Any route can be used twice"
        />
      </div>
    );
  }
}

export default Settings;
