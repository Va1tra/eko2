import { getRoutes } from 'api/routes';
import { processing } from 'decorators'
import memoize from 'memoize-one';
import React from 'react';
import { getShortestStrictPath, Graph } from 'utils/graphUtils';
import { generateUniqueId } from 'utils/utils';
import withContext from './withContext';

const Context = React.createContext({});

function withProvider(WrappedComponent) {
  class ContextWrapper extends React.PureComponent {
    state = {
      graph: new Graph([]),
      isLoading: true,
      route: [],
      settings: {
        isNoExtraStops: true,
      }
    }

    componentDidMount = processing('isLoading')(async function() {
      const data = await getRoutes();

      this.setState({ graph: new Graph(data) });
    });

    getCities = memoize(graph => graph.getVerticesIds())

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
            result: { isPathFound: true, pathWeight: path.getWeight() },
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
