import cn from 'classnames';
import Checkbox from 'components/Form/Checkbox';
import Input from 'components/Form/Input';
import Radio from 'components/Form/Radio';
import Select from 'components/Form/Select';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import SearchTypeEnum from './SearchTypeEnum';
import './Settings.scss';

class Settings extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    onAddRouteNode: PropTypes.func.isRequired,
    onCanUseStepTwice: PropTypes.func.isRequired,
    onMaxStopsChange: PropTypes.func.isRequired,
    onSearchTypeChange: PropTypes.func.isRequired,
    route: PropTypes.arrayOf(PropTypes.shape({ city: PropTypes.string })).isRequired,
    settings: PropTypes.shape({
      canUseStepTwice: PropTypes.bool,
      maxPathWeight: PropTypes.number,
      maxStops: PropTypes.number,
      searchType: PropTypes.oneOf([SearchTypeEnum.SHORTEST_STRICT_PATH, SearchTypeEnum.ALL_PATHS])
    }).isRequired,
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
      onCanUseStepTwice,
      onMaxPathWeightChange,
      onMaxStopsChange,
      onSearchTypeChange,
      route,
      settings,
    } = this.props;

    const options = this.getSelectOptions(cities, route);

    return (
      <div className={cn('Settings', className)}>
        <Select
          disabled={settings.searchType === SearchTypeEnum.ALL_PATHS && route.length >= 2 }
          onChangeValue={onAddRouteNode}
          options={options}
          placeholder={options.length > 0
            ? 'Select next city in a route'
            : 'All cities are selected'
          }
          selectedValue={-1}
        />

        <Radio
          checked={settings.searchType === SearchTypeEnum.SHORTEST_STRICT_PATH}
          className="mt-2"
          onChangeValue={onSearchTypeChange}
          label="Find shortest strict route"
          value={SearchTypeEnum.SHORTEST_STRICT_PATH}
        />
        <Radio
          checked={settings.searchType === SearchTypeEnum.ALL_PATHS}
          className="mt-2"
          onChangeValue={onSearchTypeChange}
          label="Find all routes (choose only origin and destination)"
          value={SearchTypeEnum.ALL_PATHS}
        />

        {settings.searchType === SearchTypeEnum.ALL_PATHS && (
          <React.Fragment>
            <Input
              className="mt-3"
              min={0}
              onChangeValue={onMaxStopsChange}
              placeholder="Maximum number of stops"
              type="number"
              value={settings.maxStops}
            />

            <Input
              className="mt-3"
              min={0}
              onChangeValue={onMaxPathWeightChange}
              placeholder="Maximum route cost"
              type="number"
              value={settings.maxPathWeight}
            />

            <Checkbox
              checked={settings.canUseStepTwice}
              className="mt-2"
              label="Any route can be used twice"
              onChangeValue={onCanUseStepTwice}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Settings;
