function compose(...args) {
  return function (Component) {
    return args.reduceRight(
      (result, hoc) => hoc(result),
      Component
    );
  };
}

export {
  compose,
}
