import { createGraph, getShortestStrictPath, getPaths, Graph } from './graphUtils';

describe('graphUtils', () => {
  describe('should find shortest strict path', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'AB3'],
        ['A', 'B'],
        [{ start: 'A', end: 'B', weight: 1}],
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'AB3', 'BD4', 'BD2'],
        ['A', 'B', 'D'],
        [{ start: 'A', end: 'B', weight: 1}, { start: 'B', end: 'D', weight: 2}],
      ]
    ];

    data.forEach(([label, edges, route, expected]) => {
      test(label, () => {
        const path = getShortestStrictPath(createGraph(edges), route);

        expect(path).toHaveLength(expected.length);

        for (let i = 0; i < path.length; i++) {
          expect(path[i]).toMatchObject(expected[i]);
        }
      })
    })
  });

  describe('should not find shortest strict path', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'AB3'],
        ['A', 'C'],
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'AB3', 'BD4', 'BD2'],
        ['A', 'D'],
      ]
    ];

    data.forEach(([label, edges, route]) => {
      test(label, () => {
        const path = getShortestStrictPath(createGraph(edges), route);

        expect(path).toBeNull();
      })
    })
  });

  describe('should find all paths', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'AB3'],
        ['A', 'B'],
        [
          'AB1',
          'AB2',
          'AB3',
        ]
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'BD1'],
        ['A', 'D'],
        [
          'AB1 -> BD1',
          'AB2 -> BD1',
        ],
      ],
      [
        'case 3',
        ['AB1', 'AB2', 'BD1', 'DC1', 'AC6'],
        ['A', 'C'],
        [
          'AB1 -> BD1 -> DC1',
          'AB2 -> BD1 -> DC1',
          'AC6',
        ],
      ]
    ];

    data.forEach(([label, data, route, expected]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1]);

        expect(paths.map(x => x.toString())).toEqual(expect.arrayContaining(expected));
      })
    })
  });

  describe('should not find any paths', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'AB3'],
        ['A', 'D'],
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'BD1'],
        ['A', 'C'],
      ],
      [
        'case 3',
        ['AB1', 'BD1', 'DC1', 'AC6', 'FG2'],
        ['A', 'G'],
      ]
    ];

    data.forEach(([label, data, route]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1]);

        expect(paths).toHaveLength(0);
      })
    })
  });
});