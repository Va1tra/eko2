import { getRoutes } from 'api/routes';
import { processing } from 'decorators'
import memoize from 'memoize-one';
import React from 'react';
import { getPathWeight, getShortestStrictPath } from 'utils/graphUtils';
import { generateUniqueId } from 'utils/utils';
import withContext from './withContext';

const Context = React.createContext({});

let edgeCount = 0;

function withProvider(WrappedComponent) {
  class ContextWrapper extends React.PureComponent {
    state = {
      graph: {},
      isLoading: true,
      route: [],
      settings: {
        isNoExtraStops: true,
      }
    }

    componentDidMount = processing('isLoading')(async function() {
      const routes = await getRoutes();

      const graph = {};

      routes.forEach(route => {
        const start = route[0];
        const end = route[1];
        const weight = Number.parseInt(route.substring(2));

        if (!graph[start]) {
          graph[start] = [];
        }

        graph[start].push({ _id: ++edgeCount, start, end, weight });
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

    setNoExtraStops = isNoExtraStops => {
      this.setState({
        settings: {
          ...this.state.settings,
          isNoExtraStops,
        },
      });
    }

    calculate = () => {
      const {
        graph,
        route,
        settings,
      } = this.state;

      if (settings.isNoExtraStops) {
        const path = getShortestStrictPath(graph, route.map(x => x.city));

        if (path) {
          this.setState({
            result: { isPathFound: true, pathWeight: getPathWeight(path) },
          });
        } else {
          this.setState({
            result: { isPathFound: false }
          });
        }
      }
    }

    render() {
      return (
        <Context.Provider value={{
          ...this.state,
          addRouteNode: this.addRouteNode,
          calculate: this.calculate,
          cities: this.getCities(this.state.graph),
          removeRouteNode: this.removeRouteNode,
          setNoExtraStops: this.setNoExtraStops,
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
