import { shallow } from 'enzyme';
import React from 'react';
import { withProvider } from './RoutesContext';

describe('RoutesContext', () => {
  const Component = withProvider(() => null);

  test('should add route node', () => {
    const wrapper = shallow(<Component />);

    wrapper.instance().addRouteNode('A');

    expect(wrapper.state().route).toContainObject({ city: 'A' });
  });

  test('should remove route node', () => {
    const wrapper = shallow(<Component />);

    wrapper.instance().addRouteNode('A');
    wrapper.instance().addRouteNode('B');
    wrapper.instance().addRouteNode('C');
    wrapper.instance().removeRouteNode(wrapper.state().route[1]._id);

    expect(wrapper.state().route).toContainObject({ city: 'A' });
    expect(wrapper.state().route).not.toContainObject({ city: 'B' });
    expect(wrapper.state().route).toContainObject({ city: 'C' });
  });
});
