import Checkbox from 'components/Form/Checkbox';
import Select from 'components/Form/Select';
import PropTypes from 'prop-types';
import React from 'react';

class Settings extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  getSelectOptions(cities) {
    return cities.map(city => ({ label: city, value: city}))
  }

  render() {
    const { cities } = this.props;

    return (
      <div className="Settings">
        <Select
            options={this.getSelectOptions(cities)}
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
