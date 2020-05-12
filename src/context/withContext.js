import React from 'react';

function uniteAll(Component, Context, propNameMapping = null) {
  return function WithContextWrapper(props) {
    return (
      <Context.Consumer>
        {(contextValue = {}) => {
          let newProps = { ...props };
          if (propNameMapping) {
            let mappedProps = {};
            if (propNameMapping instanceof Function) {
              mappedProps = propNameMapping(contextValue, props);
            } else if (Array.isArray(propNameMapping)) {
              propNameMapping.forEach((n) => { mappedProps[n] = contextValue[n]; });
            } else if (propNameMapping instanceof Object) {
              Object.keys(propNameMapping).forEach(k => { mappedProps[propNameMapping[k] || k] = contextValue[k]; });
            } else {
              mappedProps[propNameMapping] = contextValue;
            }
            newProps = { ...props, ...mappedProps };
          } else {
            newProps = { ...props, ...contextValue };
          }
          return (
            <Component {...newProps} />
          );
        }}
      </Context.Consumer>
    );
  };
}

export default function (Context) {
  return function (propNameMapping = null) {
    return function (Component) {
      return uniteAll(Component, Context, propNameMapping);
    };
  };
}
