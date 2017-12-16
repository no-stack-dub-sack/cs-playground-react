export const tail = `
if (typeof new Graph() === 'object') {
  Graph.prototype.__clearGraph__ = function () {
    this.__data__.clear()
    this.numEdges = 0
  }
  Graph.prototype.__entries__ = function() {
    return [...this.__data__.entries()]
  }
}

let __graph__
let oldConsoleLog = console.log

const testHooks = {
  beforeAll: () => {
    __graph__ = new Graph()
    if (typeof __graph__.__data__ === 'undefined' ||
        typeof __graph__.numEdges === 'undefined' ) {
      console.log(
        'WARNING: Graph must have properties <code>__data__</code> and <code>numEdges</code> for tests to work!\\n'
      )
    }
  },
  beforeEach: () => {
    console.log = () => {}
    __graph__.__clearGraph__()
    typeof __graph__.addVertex === 'function' &&
      ['A', 'B', 'C', 1, 2, 3].forEach(v => __graph__.addVertex(v))
  },
  afterEach: () => {
    console.log = oldConsoleLog
  },
  afterAll: () => {
    __graph__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof new Graph() === 'object'`,
    message: `The <code>Graph</code> data structure exists`
  },
  {
    expression: `(() => {
      const __newGraph__ = new Graph()
      return Object.prototype.toString.call(__newGraph__.__data__) === '[object Map]' && __newGraph__.__data__.size === 0 && __newGraph__.numEdges === 0
    })()`,
    message: `The <code>Graph</code> data structure has <code>__data__</code> and <code>numEdges</code> properties which initialize to a new <code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="noopener noreferrer" target="_blank">Map</a></code> and <code>0</code> respectively`
  },
  {
    expression: `typeof __graph__.addVertex === 'function'`,
    message: `The <code>Graph</code> class has an <code>addVertex</code> method: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    method: 'deepEqual',
    expression: `__graph__.__entries__()`,
    expected: [["A",[]],["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]],
    message: `The <code>addVertex</code> method adds unique entries to the the Graph's internal Map object; the given <code>vertex</code> as the key, and an empty array (initalized adjacency list) as the value`
  },
  {
    expression: `typeof __graph__.addEdge === 'function'`,
    message: `The <code>Graph</code> class has an <code>addEdge</code> method: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>destination</code>`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      return __graph__.__entries__()
    })()`,
    expected: [["A",["B","C"]],["B",[3,"A"]],["C",["A"]],[1,[3]],[2,[]],[3,[1,"B"]]],
    message: `The <code>addEdge</code> method adds an edge, or connection, between two existing vertices by adding the <code>destination</code> vertex to the <code>source</code> vertex's corresponding adjacency list, and vice versa`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.addEdge(1, 'B')
      const TEST_1 = __graph__.addEdge(1, 'B') === false // duplicate edge
      const TEST_2 = __graph__.addEdge(1, 'Hi') === false // second arg is not vertex
      const TEST_3 = __graph__.addEdge('Yo', 'B') === false // first arg is not vertex
      return TEST_1 && TEST_2 && TEST_3 && __graph__.__entries__()
    })()`,
    expected: [["A",[]],["B",[1]],["C",[]],[1,["B"]],[2,[]],[3,[]]],
    message: `The <code>addEdge</code> method returns <code>false</code> and does not add a connection if an edge between the given vertices already exists, or if either of the given vertices do not exist`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      const TEST_1 = __graph__.numEdges === 2
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      return TEST_1 && __graph__.numEdges === 4
    })()`,
    message: `The <code>addEdge</code> method increments the graph's <code>numEdges</code> property by one for each edge added to the graph`
  },
  {
    expression: `typeof __graph__.removeVertex === 'function'`,
    message: `The <code>Graph</code> class has a <code>removeVertex</code> method: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.removeVertex('A')
      return __graph__.__entries__()
    })()`,
    expected: [["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]],
    message: `The <code>removeVertex</code> method removes the given <code>vertex</code> from the graph`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      __graph__.removeVertex('A')
      return __graph__.__entries__()
    })()`,
    expected: [["B",[3]],["C",[]],[1,[3]],[2,[]],[3,[1,"B"]]],
    message: `The <code>removeVertex</code> method removes any edges/connections associated with the given <code>vertex</code> from the graph`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      return __graph__.removeVertex('J') === false && __graph__.__entries__()
    })()`,
    expected: [["A",[]],["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]],
    message: `The <code>removeVertex</code> method does not mutate the graph and returns <code>false</code> if the given <code>vertex</code> does not exist`
  },
  {
    expression: `typeof __graph__.removeEdge === 'function'`,
    message: `The <code>Graph</code> class has a <code>removeEdge</code> method: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>destination</code>`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      __graph__.removeEdge('B', 'A')
      __graph__.removeEdge(3, 'B')
      __graph__.removeEdge(3, 1)
      __graph__.removeEdge('C', 'A')
      return __graph__.__entries__()
    })()`,
    expected: [["A",[]],["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]],
    message: `The <code>removeEdge</code> method removes the edge/connection between the given <code>source</code> and <code>destination</code> vertices, and vice versa`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      __graph__.removeEdge('B', 'A')
      __graph__.removeEdge(3, 'B')
      const TEST_1 = __graph__.numEdges === 2
      __graph__.removeEdge(3, 1)
      __graph__.removeEdge('C', 'A')
      const TEST_2 = __graph__.numEdges === 0
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>removeEdge</code> method decrements the graph's <code>numEdges</code> property by one for each edge removed from the graph`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      __graph__.addEdge(1, 3)
      const TEST_1 = __graph__.removeEdge(1, 'A') === false
      const TEST_2 = __graph__.removeEdge('Annoying', 'A') === false
      const TEST_3 = __graph__.removeEdge('A', 'Test') === false
      const TEST_4 = __graph__.removeEdge('Logs', 'Logs') === false
      return TEST_1 && TEST_2 && TEST_3 && TEST_4 && __graph__.__entries__()
    })()`,
    expected: [["A",[]],["B",[]],["C",[]],[1,[3]],[2,[]],[3,[1]]],
    message: `The <code>removeEdge</code> method does not mutate the graph and returns <code>false</code> if the given <code>source</code> and <code>destination</code> vertices do not share an edge or if either of the given vertices do not exist`
  },
  {
    expression: `typeof __graph__.size === 'function' || typeof __graph__.size === 'number'`,
    message: `The <code>Graph</code> class has a <code>size</code> method or property`
  },
  {
    expression: `(() => {
      const TEST_1 = typeof __graph__.size === 'function'
        ? __graph__.size() === 6
        : __graph__.size === 6
      __graph__.addVertex('P')
      __graph__.addVertex('W')
      __graph__.addVertex('P')
      __graph__.addVertex('W')
      const TEST_2 = typeof __graph__.size === 'function'
        ? __graph__.size() === 8
        : __graph__.size === 8
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>size</code> method or propery correctly tracks and returns the graph's current size (number of vertices)`
  },
  {
    expression: `typeof __graph__.relations === 'function' || typeof __graph__.relations === 'number'`,
    message: `The <code>Graph</code> class has a <code>relations</code> method or property`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      const TEST_1 = typeof __graph__.relations === 'function'
        ? __graph__.relations() === 4
        : __graph__.relations === 4
      __graph__.addEdge('C', 1)
      __graph__.addEdge('C', 2)
      __graph__.addEdge('C', 1)
      __graph__.addEdge('C', 2)
      const TEST_2 = typeof __graph__.relations === 'function'
        ? __graph__.relations() === 6
        : __graph__.relations === 6
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>relations</code> method or propery correctly tracks and returns the graph's current number of relations (number of edges/connections)`
  },
  {
    expression: `typeof __graph__.depthFirst === 'function'`,
    message: `The <code>Graph</code> class has a <code>depthFirst</code> search method: <span class="type">@param {(string|number)}</span> <code>startingVertex</code>`
  },
  {
    expression: `typeof __graph__.breadthFirst === 'function'`,
    message: `The <code>Graph</code> class has a <code>breadthFirst</code> search method: <span class="type">@param {(string|number)}</span> <code>startingVertex</code>`
  },
  {
    expression: `(() => {
      __graph__.__clearGraph__()
      ;[0,1,2,3,4,5].forEach(v => __graph__.addVertex(v))
      const edges = [[0, 1],[0, 3],[0, 4],[1, 2],[3, 4],[4, 5],[4, 2],[2, 5]]
      for (let [s, d] of edges) {
        __graph__.addEdge(s, d)
      }
      // depthFirst(0) => 0 -> 1 -> 2 -> 4 -> 3 -> 5
      const TEST_1 = /\\D?0\\D*1\\D*2\\D*4\\D*3\\D*5\\D?/.test(__graph__.depthFirst(0))
      // depthFirst(1) => 1 -> 0 -> 3 -> 4 -> 5 -> 2
      const TEST_2 = /\\D?1\\D*0\\D*3\\D*4\\D*5\\D*2\\D?/.test(__graph__.depthFirst(1))
      // depthFirst(3) => 3 -> 0 -> 1 -> 2 -> 4 -> 5
      const TEST_3 = /\\D?3\\D*0\\D*1\\D*2\\D*4\\D*5\\D?/.test(__graph__.depthFirst(3))
      // depthFirst(5) => 5 -> 4 -> 0 -> 1 -> 2 -> 3
      const TEST_4 = /\\D?5\\D*4\\D*0\\D*1\\D*2\\D*3\\D?/.test(__graph__.depthFirst(5))
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `The <code>depthFirst</code> method returns an array of values or a string representing the vertices of the graph explored from the given <code>startingVertex</code> in depth first order`
  },
  {
    expression: `(() => {
      __graph__.__clearGraph__()
      ;[0,1,2,3,4,5].forEach(v => __graph__.addVertex(v))
      const edges = [[0, 1],[0, 3],[0, 4],[1, 2],[3, 4],[4, 5],[4, 2],[2, 5]]
      for (let [s, d] of edges) {
        __graph__.addEdge(s, d)
      }
      // breadthFirst(0) => 0 -> 1 -> 3 -> 4 -> 2 -> 5
      const TEST_1 = /\\D?0\\D*1\\D*3\\D*4\\D*2\\D*5\\D?/.test(__graph__.breadthFirst(0))
      // breadthFirst(1) => 1 -> 0 -> 2 -> 3 -> 4 -> 5
      const TEST_2 = /\\D?1\\D*0\\D*2\\D*3\\D*4\\D*5\\D?/.test(__graph__.breadthFirst(1))
      // breadthFirst(3) => 3 -> 0 -> 4 -> 1 -> 5 -> 2
      const TEST_3 = /\\D?3\\D*0\\D*4\\D*1\\D*5\\D*2\\D?/.test(__graph__.breadthFirst(3))
      // breadthFirst(5) => 5 -> 4 -> 2 -> 0 -> 3 -> 1
      const TEST_4 = /\\D?5\\D*4\\D*2\\D*0\\D*3\\D*1\\D?/.test(__graph__.breadthFirst(5))
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `The <code>breadthFirst</code> method returns an array of values or a string representing the vertices of the graph explored from the given <code>startingVertex</code> in breadth first order`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'pathFromTo')) return 'DISABLED'
      __graph__.__clearGraph__()
      ;[0,1,2,3,4,5,6,7,8,9,10].forEach(v => __graph__.addVertex(v))
      const edges = [[0, 1],[0, 3],[0, 4],[3, 4],[4, 5],[4, 2],[2, 5],[7, 6],[8, 7],[2, 6],[2, 6],[9, 10]]
      for (let [s, d] of edges) {
        __graph__.addEdge(s, d)
      }
      // pathFromTo(3, 8) => 3 -> 4 -> 2 -> 6 -> 7 -> 8
      const TEST_1 = /\\D?3\\D*4\\D*2\\D*6\\D*7\\D*8\\D?/.test(__graph__.pathFromTo(3, 8))
      // pathFromTo(1, 5) => 1 -> 0 -> 4 -> 5
      const TEST_2 = /\\D?1\\D*0\\D*4\\D*5\\D?/.test(__graph__.pathFromTo(1, 5))
      return TEST_1 && TEST_2
    })()`,
    message: `The Graph class has a <code>pathFromTo</code> method which returns a string or an array of values representing the shortest path between two given vertices: <span class="type">@param {(string|number)}</span> <code>fromVertex</code> <span class="type">@param {(string|number)}</span> <code>toVertex</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'pathFromTo')) return 'DISABLED'
      __graph__.__clearGraph__()
      ;[0,9].forEach(v => __graph__.addVertex(v))
      return __graph__.pathFromTo(0, 9) === null && __graph__.pathFromTo(11, 2) === null
    })()`,
    message: `The <code>pathFromTo</code> method returns <code>null</code> if a path does not exist between the given vertices, or if the given <code>fromVertex</code> does not exist`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'isDirectConnection')) return 'DISABLED'
      __graph__.addEdge(1, 3)
      const TEST_1 = __graph__.isDirectConnection(1, 3) === true
      const TEST_2 = __graph__.isDirectConnection(1, 'A') === false
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>isDirectConnection</code> method returns <code>true</code> if the given vertices share an edge, otherwise <code>false</code>: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>connection</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'isIndirectConnection')) return 'DISABLED'
      __graph__.addEdge(1, 3)
      __graph__.addEdge(3, 'A')
      const TEST_1 = __graph__.isIndirectConnection(1, 'A') === true
      const TEST_2 = __graph__.isIndirectConnection(1, 2) === false
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>isIndirectConnection</code> method returns <code>true</code> if the given vertices share an indirect connection, otherwise <code>false</code>: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>connection</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'getConnections')) return 'DISABLED'
      __graph__.__clearGraph__()
      ;[0,1,2,3,4].forEach(v => __graph__.addVertex(v))
      const edges = [[0, 1],[0, 3],[0, 2],[1, 2],[3, 2],[3, 1]]
      for (let [s, d] of edges) {
        __graph__.addEdge(s, d)
      }
      const TEST_1 = JSON.stringify(__graph__.getConnections(0)) === '[1,3,2]'
      const TEST_2 = JSON.stringify(__graph__.getConnections(2)) === '[0,1,3]'
      const TEST_3 = JSON.stringify(__graph__.getConnections(3)) === '[0,2,1]'
      const TEST_4 = JSON.stringify(__graph__.getConnections(4)) === '[]'
      const TEST_5 = __graph__.getConnections(5) === null
      return TEST_1 && TEST_2 && TEST_3 && TEST_4 && TEST_5
    })()`,
    message: `The <code>getConnections</code> method returns the adjacency list for the given <code>vertex</code> or <code>null</code> if the vertex doesn't exist: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'isEmpty')) return 'DISABLED'
      const TEST_1 = __graph__.isEmpty() === false
      __graph__.__clearGraph__()
      const TEST_2 = __graph__.isEmpty() === true
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>Graph</code> class has an <code>isEmpty</code> method which returns <code>true</code> if the graph is empty, <code>false</code> if not`
  },
  {
    method: 'deepEqual',
    expression: `(() => {
      if (isTestDisabled(Graph, 'clear')) return 'DISABLED'
      __graph__.clear()
      return  __graph__.numEdges === 0 && __graph__.__entries__()
    })()`,
    expected: [],
    message: `The <code>Graph</code> class has a <code>clear</code> method which clears the graph's internal Map object and resets the <code>numEdges</code> propery to <code>0</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'hasVertex')) return 'DISABLED'
      const TEST_1 = __graph__.hasVertex('A') === true
      const TEST_2 = __graph__.hasVertex('J') === false
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>Graph</code> class has a <code>hasVertex</code> method which returns <code>true</code> if the graph has the given vertex, <code>false</code> if not: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    expression: `(() => {
      if (isTestDisabled(Graph, 'hasVertices')) return 'DISABLED'
      const TEST_1 = __graph__.hasVertices('A', 'B') === true
      const TEST_2 = __graph__.hasVertices('A', 'J') === false
      const TEST_3 = __graph__.hasVertices('J', 'A') === false
      const TEST_4 = __graph__.hasVertices('J', 'J') === false
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `The <code>Graph</code> class has a <code>hasVertices</code> method which returns <code>true</code> if the graph has both given vertices, <code>false</code> if not: <span class="type">@param {(string|number)}</span> <code>vertexOne</code> <span class="type">@param {(string|number)}</span> <code>vertexTwo</code>`
  }
]
