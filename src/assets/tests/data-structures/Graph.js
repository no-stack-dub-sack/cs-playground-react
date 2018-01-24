export const tail = `
if (typeof new Graph() === 'object') {
  Graph.prototype.__clearGraph__ = function () {
    this.list.clear();
    this.numEdges = 0;
  }
}

const __graph__ = new Graph();
const beforeEach = () => __graph__.__clearGraph__();
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
      return JSON.stringify([...__graph__.list.entries()]) === '[["A",[]],["B",[]],["C",[]]]';
    })()`,
    message: `The <code>addVertex</code> method should add unique entries to the the Graph's internal Map object; the given vertex as the key, and an empty array as the value`
  },
  // {
  //   expression: `(() => {
  //
  //   })()`,
  //   message: ``
  // },
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
