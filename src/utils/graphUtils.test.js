import { getPaths, getShortestStrictPath, Graph } from './graphUtils';

describe('graphUtils', () => {
  describe('should find shortest strict path', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'AB3'],
        ['A', 'B'],
        'AB1',
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'AB3', 'BD4', 'BD2'],
        ['A', 'B', 'D'],
        'AB1 -> BD2',
      ]
    ];

    data.forEach(([label, data, cities, expected]) => {
      test(label, () => {
        const path = getShortestStrictPath(new Graph(data), cities);

        expect(path.toString()).toEqual(expected);
      })
    });
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

    data.forEach(([label, data, cities]) => {
      test(label, () => {
        const path = getShortestStrictPath(new Graph(data), cities);

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

        expect(paths).toHaveLength(expected.length);
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

  describe('should find all paths with maxExtraStops restriction', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'BC1', 'CD1', 'DE1', 'BE2', 'AE4'],
        ['A', 'E', 3],
        [
          'AE4',
          'AB1 -> BE2',
          'AB1 -> BC1 -> CD1 -> DE1',
        ]
      ],
      [
        'case 2',
        ['AB1', 'BC1', 'CD1', 'DE1', 'BE2', 'AE4'],
        ['A', 'E', 2],
        [
          'AE4',
          'AB1 -> BE2',
        ]
      ],
      [
        'case 3',
        ['AB1', 'BC1', 'CD1', 'DE1', 'BE2', 'AE4'],
        ['A', 'E', 0],
        [
          'AE4',
        ]
      ],
    ];

    data.forEach(([label, data, route, expected]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1], route[2]);

        expect(paths).toHaveLength(expected.length);
        expect(paths.map(x => x.toString())).toEqual(expect.arrayContaining(expected));
      })
    })
  });

  describe('should find cycle paths', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'AB2', 'BC1', 'CA1'],
        ['A', 'A'],
        [
          'AB1 -> BC1 -> CA1',
          'AB2 -> BC1 -> CA1',
        ]
      ],
      [
        'case 2',
        ['AB1', 'AB2', 'BC1', 'CD1', 'CD2', 'DA1'],
        ['A', 'A'],
        [
          'AB1 -> BC1 -> CD1 -> DA1',
          'AB2 -> BC1 -> CD1 -> DA1',
          'AB1 -> BC1 -> CD2 -> DA1',
          'AB2 -> BC1 -> CD2 -> DA1',
        ]
      ],
    ];

    data.forEach(([label, data, route, expected]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1]);

        expect(paths).toHaveLength(expected.length);
        expect(paths.map(x => x.toString())).toEqual(expect.arrayContaining(expected));
      })
    })
  });

  describe('should find all paths with max weight restriction', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'BC1', 'CD1', 'AD5'],
        ['A', 'D', 5],
        [
          'AB1 -> BC1 -> CD1',
          'AD5',
        ],
      ],
      [
        'case 2',
        ['AB1', 'BC1', 'CD1', 'AD5'],
        ['A', 'D', 4],
        [
          'AB1 -> BC1 -> CD1',
        ],
      ],
      [
        'case 3',
        ['AB1', 'BC1', 'CD1', 'AD5'],
        ['A', 'D', 1],
        [],
      ],
    ];

    data.forEach(([label, data, route, expected]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1], undefined, route[2]);

        expect(paths).toHaveLength(expected.length);
        expect(paths.map(x => x.toString())).toEqual(expect.arrayContaining(expected));
      })
    })
  });

  describe('should find all paths with "can use step twice" restriction', () => {
    const data = [
      [
        'case 1',
        ['AB1', 'BC1', 'CB1', 'CD1', 'DA1'],
        ['A', 'A', true],
        [
          'AB1 -> BC1 -> CD1 -> DA1',
          'AB1 -> BC1 -> CB1 -> BC1 -> CD1 -> DA1',
        ],
      ],
      [
        'case 1',
        ['AB1', 'BC1', 'CB1', 'CD1', 'DA1'],
        ['A', 'A', false],
        [
          'AB1 -> BC1 -> CD1 -> DA1',
        ],
      ],
    ];

    data.forEach(([label, data, route, expected]) => {
      test(label, () => {
        const paths = getPaths(new Graph(data), route[0], route[1], undefined, undefined, route[2]);

        expect(paths).toHaveLength(expected.length);
        expect(paths.map(x => x.toString())).toEqual(expect.arrayContaining(expected));
      })
    })
  });
});
