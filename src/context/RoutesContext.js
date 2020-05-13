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
        const cost = Number.parseInt(route.substring(2));

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

    setNoExtraStops = isNoExtraStops => {
      this.setState({
        settings: {
          ...this.state.settings,
          isNoExtraStops,
        },
      });
    }

    calculate = () => {
      const { graph, route } = this.state;

      const routeEdges = [];

      for (let i = 0; i < route.length - 1; i++) {
        routeEdges.push({ start: route[i].city, end: route[i + 1].city });
      }

      let cost = 0;

      for (let i = 0; i < routeEdges.length; i++) {
        const currentEdge = routeEdges[i];

        const bestPath = graph[currentEdge.start]
          .filter(graphEdge => graphEdge.end === currentEdge.end)
          .sort((graphEdge1, graphEdge2) => graphEdge1.cost - graphEdge2.cost)[0];

        if (bestPath) {
          cost += bestPath.cost;
        } else {
          this.setState({ result: { isRouteFound: false } });
          return;
        }
      }

      this.setState({
        result: {
          cost,
          isRouteFound: true,
        }
      });
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
