const config = {
  autounselectify: true,
  boxSelectionEnabled: false,

  layout: {
    name: 'cola',
    options: {
      spacingFactor: 2,
    },
  },
  style: [
    {
      selector: 'node',
      style: {},
    },
    {
      selector: 'node[type="tf"]',
      style: {
        shape: 'triangle',
        label: 'data(name)',
      },
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#ccc',
        // 'target-arrow-color': '#ccc',
        // 'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
      },
    },
    {
      selector: 'node[type="gene"]',
      style: {
        'background-color': 'grey',
        label: 'data(name)',
      },
    },
    {
      selector: '*[background_color]',
      style: {
        'background-color': 'data(background_color)',
        'text-outline-color': 'data(background_color)',
        'line-color': 'data(background_color)',
      },
    },
  ],
}

const elements = [
  // list of graph elements to start with
  {
    // node a
    data: {
      id: 'a',
      type: 'tf',
      regulon: '1',
      background_color: 'blue',
      size: '0.5',
    },
  },
  {
    // node b
    data: { id: 'b', type: 'gene', regulon: '1', size: '0.3' },
  },
  {
    // node b
    data: {
      id: 'c',
      type: 'tf',
      regulon: '2',
      background_color: 'yellow',
      size: '0.7',
    },
  },
  {
    // node b
    data: { id: 'd', type: 'gene', regulon: '2' },
  },
  {
    // edge ab
    data: {
      id: 'ab',
      source: 'a',
      target: 'b',
      background_color: 'blue',
      size: '0.2',
    },
  },
  {
    // edge ab
    data: { id: 'cd', source: 'c', target: 'd' },
  },
]

export default { config, elements }
