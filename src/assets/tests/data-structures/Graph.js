export const tail = `
if (typeof new Graph() === 'object') {
  Graph.prototype.__clearGraph__ = function () {
    this.list.clear()
    this.numEdges = 0
  }
  Graph.prototype.__printAsJSON__ = function() {
    return JSON.stringify(
      [...this.list.entries()]
    )
  }
}

let __graph__
let oldConsoleLog = console.log

const testHooks = {
  beforeAll: () => {
    __graph__ = new Graph()
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
`;
export const tests = [
  {
    expression: `typeof new Graph() === 'object'`,
    message: `The <code>Graph</code> data structure exists`
  },
  {
    expression: `(() => {
      const __newGraph__ = new Graph()
      return Object.prototype.toString.call(__newGraph__.list) === '[object Map]' && __newGraph__.list.size === 0 && __newGraph__.numEdges === 0
    })()`,
    message: `The <code>Graph</code> data structure has list and <code>numEdges</code> properties which initialize to a new <code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="noopener noreferrer" target="_blank">Map</a></code> and <code>0</code> respectively`
  },
  {
    expression: `typeof __graph__.addVertex === 'function'`,
    message: `The <code>Graph</code> class has an <code>addVertex</code> method: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    expression: `(() => {
      return __graph__.__printAsJSON__() === '[["A",[]],["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]]';
    })()`,
    message: `The <code>addVertex</code> method should add unique entries to the the Graph's internal Map object; the given vertex as the key, and an empty array (initalized adjacency list) as the value`
  },
  {
    expression: `typeof __graph__.addEdge === 'function'`,
    message: `The <code>Graph</code> class has an <code>addEdge</code> method: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>destination</code>`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      return __graph__.__printAsJSON__() === '[["A",["B","C"]],["B",[3,"A"]],["C",["A"]],[1,[3]],[2,[]],[3,[1,"B"]]]'
    })()`,
    message: `The <code>addEdge</code> method adds an edge, or connection, between two existing vertices by adding the destination vertex to the source vertex's corresponding adjacency list, and vice versa`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 'B')
      return __graph__.addEdge(1, 'B') === false && // duplicate edge
             __graph__.addEdge(1, 'Hi') === false && // second arg is not vertex
             __graph__.addEdge('Yo', 'B') === false && // first arg is not vertex
             __graph__.__printAsJSON__() === '[["A",[]],["B",[1]],["C",[]],[1,["B"]],[2,[]],[3,[]]]'
    })()`,
    message: `The <code>addEdge</code> method returns <code>false</code> and does not add a connection if an edge between the given vertices already exists, or if either of the given vertices do not exist`
  },
  {
    expression: `(() => {
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      const test_1 = __graph__.numEdges === 2
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      return test_1 && __graph__.numEdges === 4
    })()`,
    message: `The <code>addEdge</code> method increments the graph's <code>numEdges</code> property by one for each edge added to the graph`
  },
  {
    expression: `typeof __graph__.removeVertex === 'function'`,
    message: `The <code>Graph</code> class has a <code>removeVertex</code> method: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    expression: `(() => {
      __graph__.removeVertex('A')
      return __graph__.__printAsJSON__() === '[["B",[]],["C",[]],[1,[]],[2,[]],[3,[]]]';
    })()`,
    message: `The <code>removeVertex</code> method removes the given vertex from the graph`
  },
  {
    expression: `(() => {
      __graph__.addVertex('A') // huh??????
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge('A', 'B')
      __graph__.addEdge('C', 'A')
      __graph__.removeVertex('A')
      return __graph__.__printAsJSON__() === '[["B",[3]],["C",[]],[1,[3]],[2,[]],[3,[1,"B"]]]';
    })()`,
    message: `The <code>removeVertex</code> method removes any edges/connections associated with the given vertex from the graph`
  },
  // {
  //   expression: ``,
  //   message: ``
  // },
  // {
  //   expression: `(() => {
  //
  //   })()`,
  //   message: ``
  // },
]
