function getShortestStrictPath(graph, cities) {
  const path = [];

  let start = cities[0];
  let end = cities[0];

  for (let i = 1; i < cities.length; i++) {
    start = end;
    end = cities[i];

    const shortestStep = graph[start]
      .filter(edge => edge.end === end)
      .sort((edge1, edge2) => edge1.weight - edge2.weight)[0];

    if (shortestStep) {
      path.push(shortestStep);
    } else {
       return null;
    }
  }

  return path;
}

function getPathWeight(path) {
  return path.reduce((weight, nextStep) => weight + nextStep.weight, 0);
}

export {
  getPathWeight,
  getShortestStrictPath,
}
