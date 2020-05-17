class Graph {
  constructor(data) {
    this.vertices = {};

    data.forEach(str => {
      const start = str[0];
      const end = str[1];
      const weight = Number.parseInt(str.substring(2));

      if (!this.vertices[start]) {
        this.vertices[start] = new Vertex(start);
      }

      this.vertices[start].addEdge(new Edge(start, end, weight));
    });
  }

  getVertexById(id) {
    return this.vertices[id];
  }

  getVerticesIds() {
    return Object.keys(this.vertices);
  }
}

class Vertex {
  constructor(id) {
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }
}

class Edge {
  static uniqueId = 0;

  constructor(start, end, weight) {
    this.id = ++Edge.uniqueId;
    this.start = start;
    this.end = end;
    this.weight = weight
  }
}

class Path {
  constructor(steps = []) {
    this.steps = [...steps];
  }

  getStopsNumber() {
    return this.steps.length;
  }

  getWeight() {
    return this.steps.reduce((total, nextStep) => total + nextStep.weight, 0);
  }

  getNumberOfTimesStepIsUsed(step) {
    return this.steps.filter(x => x === step).length;
  }

  addStep(step) {
    this.steps.push(step);

    return this;
  }


  combine(path) {
    this.steps.push(...path.steps);

    return this;
  }

  clone() {
    return new Path(this.steps);
  }

  toString() {
    return this.steps
      .map(edge => `${edge.start}${edge.end}${edge.weight}`)
      .join(' -> ');
  }
}

function getShortestStrictPath(graph, cities) {
  const path = new Path();

  let start = cities[0];
  let end = cities[0];

  for (let i = 1; i < cities.length; i++) {
    start = end;
    end = cities[i];

    const vertex = graph.getVertexById(start);

    if (!vertex) {
      return null;
    }

    const shortestStep = vertex.edges
      .filter(edge => edge.end === end)
      .sort((edge1, edge2) => edge1.weight - edge2.weight)[0];

    if (shortestStep) {
      path.addStep(shortestStep);
    } else {
       return null;
    }
  }

  return path;
}

function getPaths(graph, origin, destination, maxStops = Number.POSITIVE_INFINITY, maxPathWeight = Number.POSITIVE_INFINITY, canUseStepTwice = false ) {
  function getNext(vertex, prevPath) {
    if (!vertex || maxStops < prevPath.getStopsNumber() + 1) {
      return [];
    }

    const paths = [];

    for (let i = 0; i < vertex.edges.length; i++) {
      const edge = vertex.edges[i];

      if (canUseStepTwice) {
        if (prevPath.getNumberOfTimesStepIsUsed(edge) >= 2) {
          continue
        }
      } else if (prevPath.getNumberOfTimesStepIsUsed(edge) >= 1) {
        continue;
      }

      if (maxPathWeight < prevPath.getWeight() + edge.weight) {
        continue;
      }

      if (edge.end === destination) {
        paths.push(prevPath.clone().addStep(edge));
      } else {
        const nextPaths = getNext(
          graph.getVertexById(edge.end),
          prevPath.clone().addStep(edge),
        );

        paths.push(...nextPaths);
      }
    }

    return paths;
  }

  return getNext(graph.getVertexById(origin), new Path());
}

export {
  Graph,
  getPaths,
  getShortestStrictPath,
}
