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

const __graph__ = new Graph()
let oldConsoleLog = null

const testHooks = {
  beforeEach: function() {
    oldConsoleLog = console.log
    console.log = () => {}
    __graph__.__clearGraph__()
  },
  afterEach: () => {
    console.log = oldConsoleLog
  }
}
`;
export const tests = [
  {
    expression: `typeof new Graph() === 'object'`,
    message: `The <code>Graph</code> data structure exists`
  },
  {
    expression: `Object.prototype.toString.call(__graph__.list) === '[object Map]' && __graph__.list.size === 0 && __graph__.numEdges === 0`,
    message: `The <code>Graph</code> data structure has list and <code>numEdges</code> properties which initialize to a new <code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" rel="noopener noreferrer" target="_blank">Map</a></code> and <code>0</code> respectively`
  },
  {
    expression: `typeof __graph__.addVertex === 'function'`,
    message: `The <code>Graph</code> class has an <code>addVertex</code> method: <span class="type">@param {(string|number)}</span> <code>vertex</code>`
  },
  {
    expression: `(() => {
      __graph__.addVertex('A')
      __graph__.addVertex('B')
      __graph__.addVertex('C')
      return __graph__.__printAsJSON__() === '[["A",[]],["B",[]],["C",[]]]';
    })()`,
    message: `The <code>addVertex</code> method should add unique entries to the the Graph's internal Map object; the given vertex as the key, and an empty array (initalized adjacency list) as the value`
  },
  {
    expression: `typeof __graph__.addEdge === 'function'`,
    message: `The <code>Graph</code> class has an <code>addEdge</code> method: <span class="type">@param {(string|number)}</span> <code>source</code> <span class="type">@param {(string|number)}</span> <code>destination</code>`
  },
  {
    expression: `(() => {
      __graph__.addVertex(1)
      __graph__.addVertex('B')
      __graph__.addVertex(3)
      __graph__.addEdge(1, 'B')
      __graph__.addEdge(1, 3)
      __graph__.addEdge('B', 3)
      __graph__.addEdge(3, 'B')
      return __graph__.__printAsJSON__() === '[[1,["B",3]],["B",[1,3]],[3,[1,"B"]]]'
    })()`,
    message: `The <code>addEdge</code> method adds an edge, or connection, between two existing vertices by adding the destination vertex to the source vertex's corresponding adjacency list, and vice versa`
  },
  {
    expression: `(() => {
      __graph__.addVertex(1)
      __graph__.addVertex('B')
      __graph__.addEdge(1, 'B')
      return __graph__.addEdge(1, 'B') === false && // duplicate edge
             __graph__.addEdge(1, 'C') === false && // second arg is not vertex
             __graph__.addEdge('D', 'B') === false && // first arg is not vertex
             __graph__.__printAsJSON__() === '[[1,["B"]],["B",[1]]]'
    })()`,
    message: `The <code>addEdge</code> method returns <code>false</code> and does not add a connection if an edge between the given vertices already exists, or if either of the given vertices do not exist`
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
