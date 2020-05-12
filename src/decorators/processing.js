function addUnmountingDetection(component) {
  if (component._processing_isUnmountingDetectionAdded) {
    return;
  }

  const prevComponentWillUnmount = 'componentWillUnmount' in component
    ? component.componentWillUnmount
    : () => {};

  Object.defineProperties(component, {
    _processing_isUnmountingDetectionAdded: { value: true },
    _processing_isUnmounted: { value: false, writable: true, configurable: true },
    componentWillUnmount: {
      value: function(...args) {
        this._processing_isUnmounted = true;

        return prevComponentWillUnmount.apply(this, args);
      },
      writable: true,
      configurable: true,
    }
  });
}

function decorate(flagName, ...args) {
  function wrapper(fn) {
    let runningCount = 0;

    return async function (...args2) {
      addUnmountingDetection(this);

      try {
        runningCount++;
        this.setState({ [flagName]: true });
        return await fn.call(this, ...args2);
      } finally {
        runningCount--;

        if (runningCount === 0 && !this._processing_isUnmounted) {
          this.setState({ [flagName]: false });
        }
      }
    };
  }

  if (args.length === 1) {
    const fn = args[0];

    return wrapper(fn);
  }

  // const target = args[0];
  // const key = args[1];
  const descriptor = args[2];
  const fn = descriptor.value;

  return {
    ...descriptor,
    value: wrapper(fn),
  };
}

function processing(...args) {
  if (args.length === 1 && typeof args[0] === 'string') {
    return function(...args2) {
      return decorate(args[0], ...args2);
    };
  }

  return decorate('isProcessing', ...args);
}

export default processing;
