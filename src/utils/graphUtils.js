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

  addStep(step) {
    this.steps.push(step);
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


let edgeCount = 0;

function createGraph(data) {
  const graph = {};

  data.forEach(route => {
    const start = route[0];
    const end = route[1];
    const weight = Number.parseInt(route.substring(2));

    if (!graph[start]) {
      graph[start] = [];
    }

    graph[start].push({ _id: ++edgeCount, start, end, weight });
  });

  return graph;
}

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

function getPaths(graph, origin, destination, maxExtraStops = undefined, canUseStepTwice) {
  function getNext(vertex) {
    if (!vertex) {
      return null;
    }

    const paths = [];

    for (let i = 0; i < vertex.edges.length; i++) {
      const edge = vertex.edges[i];

      if (edge.end === destination) {
        paths.push(new Path([edge]));
      } else {
        const nextPaths = getNext(graph.getVertexById(edge.end));

        if (nextPaths) {
          paths.push(...nextPaths.map(nextPath => new Path([edge]).combine(nextPath)));
        }
      }
    }

    if (paths.length === 0) {
      return null;
    }

    return paths;
  }

  return getNext(graph.getVertexById(origin), 0) || [];
}

export {
  Graph,
  createGraph,
  getPathWeight,
  getShortestStrictPath,
  getPaths,
}
