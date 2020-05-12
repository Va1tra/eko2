function compose(...args) {
  return function (Component) {
    return args.reduceRight(
      (result, hoc) => hoc(result),
      Component
    );
  };
}

let uniqueId = 0;

function generateUniqueId() {
  return ++uniqueId;
}

export {
  compose,
  generateUniqueId,
}
