import { getRoutes } from 'api/routes';
import SearchTypeEnum from 'components/Settings/SearchTypeEnum';
import { processing } from 'decorators'
import memoize from 'memoize-one';
import React from 'react';
import { getPaths, getShortestStrictPath, Graph } from 'utils/graphUtils';
import { generateUniqueId } from 'utils/utils';
import withContext from './withContext';

const Context = React.createContext({});

function withProvider(WrappedComponent) {
  class ContextWrapper extends React.PureComponent {
    state = {
      graph: new Graph([]),
      isLoading: true,
      result: undefined,
      route: [],
      settings: {
        canUseStepTwice: false,
        maxPathWeight: undefined,
        maxStops: undefined,
        searchType: SearchTypeEnum.SHORTEST_STRICT_PATH,
      },
    }

    componentDidMount = processing('isLoading')(async function() {
      const data = await getRoutes();

      this.setState({ graph: new Graph(data) });
    });

    getCities = memoize(graph => graph.getVerticesIds())

    addRouteNode = city => {
      this.setState({
        result: undefined,
        route: [...this.state.route, { _id: generateUniqueId(), city }],
      })
    }

    removeRouteNode = _id => {
      this.setState({
        result: undefined,
        route: this.state.route.filter(x => x._id !== _id),
      });
    }

    setSearchType = searchType => {
      this.setState({
        result: undefined,
        settings: {
          ...this.state.settings,
          searchType,
        },
      });
    }

    setMaxPathWeight = value => {
      this.setState({
        result:undefined,
        settings: {
          ...this.state.settings,
          maxPathWeight: value === '' ? undefined : Number.parseInt(value),
        },
      })
    }

    setMaxStops = value => {
      this.setState({
        result: undefined,
        settings: {
          ...this.state.settings,
          maxStops: value === '' ? undefined : Number.parseInt(value),
        },
      })
    }

    setUseStepTwice = canUseStepTwice => {
      this.setState({
        result: undefined,
        settings: {
          ...this.state.settings,
          canUseStepTwice,
        },
      })
    }

    calculate = () => {
      const {
        graph,
        route,
        settings,
      } = this.state;

      if (settings.searchType === SearchTypeEnum.SHORTEST_STRICT_PATH) {
        const path = getShortestStrictPath(graph, route.map(x => x.city));

        if (path) {
          console.info(path.toString());

          this.setState({
            result: { isPathFound: true, pathWeight: path.getWeight() },
          });
        } else {
          this.setState({
            result: { isPathFound: false }
          });
        }
      } else {
        const paths = getPaths(
          graph,
          route[0].city,
          route[1].city,
          settings.maxStops,
          settings.maxPathWeight,
          settings.canUseStepTwice,
        );

        console.info(paths.map(x => x.toString()));

        this.setState({
          result: { count: paths.length },
        })
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
          setMaxPathWeight: this.setMaxPathWeight,
          setMaxStops: this.setMaxStops,
          setSearchType: this.setSearchType,
          setUseStepTwice: this.setUseStepTwice,
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
