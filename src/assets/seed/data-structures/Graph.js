export default {
    title: 'Graph',
    seed:
`class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.list = new Map();
    }

    // Methods to Implement:

    addVertex(vertex)
    removeVertex(vertex)
    addEdge(source, destination)
    removeEdge(source, destination)
    isConnected(vertex, connection)
    getConnections(vertex)
    hasVertex(vertex)
    hasVertices(vertexOne, vertexTwo)
    clear()
    isEmpty()
    size ()
    breadthFirst(start)
    depthFirst(start)
    print()
}
`,
  solution:
`/**
 * Class representing a Graph, Adjacency-List representation
 */
class Graph {
    /**
     * Creates empty Map to store key-value pairs
     *
     * @property {Object} list
     * @property {number} numVertices Number of vertices in the Graph
     */
    constructor() {
        this.list = new Map()
        this.numVertices = 0
    }

    /**
     * Adds a vertex to the Graph
     *
     * @memberOf Graph
     * @param {(string|number)}  vertex The vertex to be added to the Graph
     * @returns {boolean} Returns true if vertex was added, otherwise false
     */
    addVertex(vertex) {
        return this.list.has(vertex)
          ? false
          : (
            this.list.set(vertex, []),
            this.numVertices++,
            true
        )
    }

    /**
     * Removes a vertex from the Graph
     *
     * @memberOf Graph
     * @param {(string|number)}  vertex The vertex to be removed from the Graph
     * @returns {boolean} Returns true if vertex was removed, otherwise false
     */
    removeVertex(vertex) {
        return !this.list.has(vertex)
          ? null
          : (
            this.numVertices--,
            // remove map[vertex]
            this.list.delete(vertex),
            // remove associated edges
            this.list.forEach((v, k, m) =>
                m.set(k, v.filter(v => v !== vertex))
            ),
            true
        )
    }

    /**
     * Adds an edge/connection between the source & destination vertices
     *
     * @memberOf Graph
     * @param {(string|number)}  source The vertex to add the connection to
     * @param {(string|number)}  destination The vertex being connected with source
     * @returns {boolean} Returns true/false if connection was successful
     */
    addEdge(source, destination) {
        return (
            !this.hasVertices(source, destination) ||
            this.isConnected(source, destination)
        ) ? false
          : (
            this.list.get(source).push(destination),
            this.list.get(destination).push(source),
            true
        )
    }

    /**
     * Removes an edge/connection between the source & destination vertices
     *
     * @memberOf Graph
     * @param {(string|number)}  source The vertex to remove the connection from
     * @param {(string|number)}  destination The vertex being disconnected from source
     * @returns {boolean} Returns true/false if removal was successful
     */
    removeEdge(source, destination) {
        return (
            !this.hasVertices(source, destination) ||
            !this.isConnected(source, destination)
        ) ? null
          : (
            this.list.set(
                source,
                this.list.get(source)
                .filter(v => v !== destination)
            ),
            this.list.set(
                destination,
                this.list.get(destination)
                .filter(v => v !== source)
            ),
            true
        )
    }

    /**
     * Determines if two vertices share an edge/connection
     *
     * @memberOf Graph
     * @param {(string|number)}  vertex The vertex to check
     * @param {(string|number)}  connection The vertex being checked against source
     * @returns {boolean} Returns true/false if connection exists
     */
    isConnected(vertex, connection) {
        return this.list.has(vertex)
            ? this.list
                .get(vertex)
                .indexOf(connection) !== -1
            : false
    }

    /**
     * List edges/connections of a given vertex
     *
     * @memberOf Graph
     * @param {(string|number)}  vertex The vertex to list connections for
     * @returns {Array} Returns an array of the vertex's connections
     */
    getConnections(vertex) {
        return this.list.has(vertex)
            ? this.list.get(vertex)
            : null
    }

    /**
     * Determine if the graph has a vertex
     *
     * @memberOf Graph
     * @param {(string|number)}  vertex The vertex to check for
     * @returns {boolean} Returns true/false if Graph has vertex
     */
    hasVertex(vertex) {
        return this.list.has(vertex)
    }

    /**
     * Internal/external helper to determine if Graph has 2 vertices
     *
     * @memberOf Graph
     * @param {(string|number)}  vertexOne The first vertex to check for
     * @param {(string|number)}  vertexTwo The second vertex to check for
     * @returns {boolean} Returns true/false if Graph has vertices
     */
    hasVertices(vertexOne, vertexTwo) {
        return this.list.has(vertexOne)
            && this.list.has(vertexTwo)
            ? true
            : false
    }

    /**
     * Clear graph of all data
     *
     * @memberOf Graph
     */
    clear() {
        this.numVerticies = 0
        this.list.clear()
    }

    /**
     * Helper to determine if Graph is empty
     *
     * @memberOf Graph
     * @returns {boolean} Returns true/false if Graph is empty
     */
    isEmpty() {
        return ![
          ...this.list.keys()
        ].length
    }

    /**
     * Helper to determine size of Graph
     *
     * @memberOf Graph
     * @returns {number} Returns number of vertices in Graph
     */
    get size () {
      return this.numVertices
    }

    /**
     * Explore the Graph using a breadth-first search
     *
     * @memberOf Graph
     * @returns {Array} Returns an array of vertices visited in BF order
     */
    breadthFirst(start){

        const visited = {}, results = [], queue = []

        visited[start] = true
        queue.push(start)

        while (queue.length) {
            const nextVertex = queue.shift()
            const adjList = this.list.get(nextVertex)

            results.push(nextVertex)

            for (let el of adjList) {
                if (!visited[el]) {
                    visited[el] = true
                    queue.push(el)
                }
            }

        }

        return results
    }

    /**
     * Explore the Graph using a depth-first search
     *
     * @memberOf Graph
     * @returns {Array} Returns an array of vertices visited in DF order
     */
    depthFirst(start) {

        var visited = {}

        const traverse = (vertex, results = []) => {

            results.push(vertex)
            visited[vertex] = true
            const adjList = this.list.get(vertex)

            for (let el of adjList) {
                if (!visited[el]) {
                    traverse(el, results)
                }
            }

            return results
        }

        return traverse(start)
    }

    /**
     * Helper for visualizing the Graph
     * Prints vertices and their corresponding adjacency lists
     *
     * @memberOf Graph
     */
    print() {
        for (let [key, value] of this.list) {
            console.log(\`\${key} -> \${value.join(', ')}\`)
        }
    }
}

// Example Usage:

var graph = new Graph()
var vertices = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake']

for (var i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i])
}

graph.addEdge('Rat', 'Ox')
graph.addEdge('Rat', 'Rabbit')
graph.addEdge('Rat', 'Dragon')
graph.addEdge('Ox', 'Tiger')
graph.addEdge('Rabbit', 'Dragon')
graph.addEdge('Dragon', 'Snake')
graph.addEdge('Dragon', 'Tiger')
graph.addEdge('Tiger', 'Snake')

graph.addEdge('Rat', 'Bear') // no connection added
graph.addEdge('Bear', 'Rat') // no connection added
graph.addEdge('Rat', 'Ox') // dupe connection not added

graph.print()

console.log('\\nSearches:')
console.log('Depth First:', graph.depthFirst('Rat'))
console.log('Breadth First:', graph.breadthFirst('Rat'))

if (graph.isConnected('Rat', 'Dragon') &&
    graph.isConnected('Dragon', 'Snake')
   ) {
    graph.removeEdge('Rat', 'Dragon')
    graph.removeEdge('Snake', 'Dragon')
}

console.log('\\nhandle removing non-existing connection:')
console.log('graph.removeEdge(\\'Dragon\\', \\'Ox\\') ===', graph.removeEdge('Dragon', 'Ox'))

if (graph.isConnected('Tiger', 'Dragon')) {
	console.log('\\nTiger\\'s connections:', graph.getConnections('Tiger'))
	console.log('Dragon\\'s connections:', graph.getConnections('Dragon'))
}

if (graph.hasVertex('Rabbit')) {
    graph.removeVertex('Rabbit')
}

console.log('\\nModified Graph:')
graph.print()

if (!graph.isEmpty()) {
    graph.clear()
    graph.print()
}
`,
  resources: [
      { href: 'http://www.geeksforgeeks.org/graph-and-its-representations/', caption: 'GeeksforGeeks.org'},
      { href: 'http://www.geeksforgeeks.org/implementation-graph-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
      { href: 'https://en.wikipedia.org/wiki/Adjacency_list', caption: 'Wikipedia'},
      { href: 'https://www.cs.usfca.edu/~galles/visualization/ConnectedComponent.html', caption: 'Interactive Animated Visualization'},
  ]
};
