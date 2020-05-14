import Select from 'components/Form/Select';
import { shallow } from 'enzyme';
import React from 'react';
import Settings from './Settings';

describe('Settings', () => {
  test('should filter selected cities', () => {
    const props = {
      cities: ['A', 'B'],
      route: [{ _id: 1, city: 'A' }],
      settings: {},
    };
    const wrapper = shallow(<Settings {...props} />);

    const options = wrapper.find(Select).props().options;
    expect(options).not.toContainObject({ label: 'A', value: 'A' });
    expect(options).toContainObject({ label: 'B', value: 'B' });
  })
});
