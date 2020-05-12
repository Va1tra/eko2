import { getRoutes } from 'api/routes';
import { processing } from 'decorators'
import memoize from 'memoize-one';
import React from 'react';
import withContext from './withContext';

const Context = React.createContext({});

let edgeCount = 0;

function withProvider(WrappedComponent) {
  class ContextWrapper extends React.PureComponent {
    state = {
      graph: {},
      isLoading: true,
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

    render() {
      return (
        <Context.Provider value={{
          ...this.state,
          cities: this.getCities(this.state.graph),
        }}>
          <WrappedComponent {...this.props} />
        </Context.Provider>
      );
    }
  }

  return ContextWrapper;
}

export default {
  withProvider: Component => withProvider(Component),
  withContext: withContext(Context),
};
