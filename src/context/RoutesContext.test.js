import { shallow } from 'enzyme';
import React from 'react';
import { withProvider } from './RoutesContext';

describe('RoutesContext', () => {
  const Component = withProvider(() => null);

  test('should add route node', () => {
    const wrapper = shallow(<Component />);

    wrapper.instance().addRouteNode('A');

    expect(wrapper.state().route).toContainObject({ city: 'A' });
  })
});
