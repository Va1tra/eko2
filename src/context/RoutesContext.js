import { getRoutes } from 'api/routes';
import { processing } from 'decorators'
import memoize from 'memoize-one';
import React from 'react';
import withContext from './withContext';
import { generateUniqueId } from 'utils/utils';

const Context = React.createContext({});

let edgeCount = 0;

function withProvider(WrappedComponent) {
  class ContextWrapper extends React.PureComponent {
    state = {
      graph: {},
      isLoading: true,
      route: [],
    }

    componentDidMount = processing('isLoading')(async function() {
      const routes = await getRoutes();

      const graph = {};

      routes.forEach(route => {
        const start = route[0];
        const end = route[1];
        const cost = route.substring(2);

        if (!graph[start]) {
          graph[start] = [];
        }

        graph[start].push({ _id: ++edgeCount, start, end, cost });
      });

      this.setState({ graph });
    });

    getCities = memoize(graph => Object.keys(graph))

    addRouteNode = city => {
      this.setState({ route: [...this.state.route, { _id: generateUniqueId(), city }] })
    }

    removeRouteNode = _id => {
      this.setState({ route: this.state.route.filter(x => x._id !== _id) });
    }

    render() {
      return (
        <Context.Provider value={{
          ...this.state,
          addRouteNode: this.addRouteNode,
          cities: this.getCities(this.state.graph),
          removeRouteNode: this.removeRouteNode,
        }}>
          <WrappedComponent {...this.props} />
        </Context.Provider>
      );
    }
  }

  return ContextWrapper;
}

export {
  withProvider,
}
export default {
  withProvider: Component => withProvider(Component),
  withContext: withContext(Context),
};
