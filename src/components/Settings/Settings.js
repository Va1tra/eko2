import cn from 'classnames';
import Checkbox from 'components/Form/Checkbox';
import Select from 'components/Form/Select';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';

class Settings extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    onAddRouteNode: PropTypes.func.isRequired,
    route: PropTypes.arrayOf(PropTypes.shape({ city: PropTypes.string })).isRequired,
  }

  static defaultProps = {
    className: undefined,
  }

  getSelectOptions= memoize((cities, route) => {
    return cities
      .filter(city => !route.some(route => route.city === city))
      .map(city => ({ label: city, value: city}));
  })

  render() {
    const {
      cities,
      className,
      onAddRouteNode,
      route,
    } = this.props;

    return (
      <div className={cn('Settings', className)}>
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
