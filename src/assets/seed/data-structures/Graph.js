export default {
    title: 'Graph',
    seed:
`class Graph {
    constructor() {
        this.__data__ = new Map()
        this.numEdges = 0
    }

    // Methods to Implement:

    // addVertex(vertex)
    // removeVertex(vertex)
    // addEdge(source, destination)
    // removeEdge(source, destination)
    // isDirectConnection(vertex, connection)
    // isIndirectConnection(vertex, connection)
    // getConnections(vertex)
    // hasVertex(vertex)
    // hasVertices(vertexOne, vertexTwo)
    // clear()
    // isEmpty()
    // size()
    // relations()
    // pathFromTo(start)
    // breadthFirst(start)
    // depthFirst(start)
    // print()
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
     * @property {Map.<(number|string), (number|string)[]>} __data__
     * @property {number} numEdges Number of edges/connections in the Graph
     */
    constructor() {
        this.__data__ = new Map()
        this.numEdges = 0
    }

    /**
     * Adds a vertex to the Graph
     *
     * @memberOf Graph
     * @param {(string|number)} vertex The vertex to be added to the Graph
     * @returnss {boolean} Returns true/false if vertex was added
     */
    addVertex(vertex) {
        return this.__data__.has(vertex)
          ? false
          : (
            this.__data__.set(vertex, []),
            true
        )
    }

    /**
     * Removes a vertex from the Graph
     *
     * @memberOf Graph
     * @param {(string|number)} vertex The vertex to be removed from the Graph
     * @returnss {boolean} Returns true/false if vertex was removed
     */
    removeVertex(vertex) {
        return !this.__data__.has(vertex)
          ? false
          : (
            // remove map[vertex]
            this.__data__.delete(vertex),
            // remove associated edges
            this.__data__.forEach((v, k, m) =>
                m.set(k, v.filter(v => v !== vertex))
            ),
            true
        )
    }

    /**
     * Adds an edge/connection between the source & destination vertices
     * As an undirected graph, the connection must exist both ways
     *
     * @memberOf Graph
     * @param {(string|number)} source The vertex to add the connection to
     * @param {(string|number)} destination The vertex being connected with source
     * @returnss {boolean} Returns true/false if connection was successful
     */
    addEdge(source, destination) {
        return (
            !this.hasVertices(source, destination) ||
            this.isDirectConnection(source, destination)
        ) ? false
          : (
            this.numEdges++,
            this.__data__.get(source).push(destination),
            this.__data__.get(destination).push(source),
            true
        )
    }

    /**
     * Removes an edge/connection between the source & destination vertices
     *
     * @memberOf Graph
     * @param {(string|number)} source The vertex to remove the connection from
     * @param {(string|number)} destination The vertex being disconnected from source
     * @returnss {boolean} Returns true/false if removal was successful
     */
    removeEdge(source, destination) {
        return (
            !this.hasVertices(source, destination) ||
            !this.isDirectConnection(source, destination)
        ) ? false
          : (
            this.numEdges--,
            this.__data__.set(
                source,
                this.__data__.get(source)
                .filter(v => v !== destination)
            ),
            this.__data__.set(
                destination,
                this.__data__.get(destination)
                .filter(v => v !== source)
            ),
            true
        )
    }

    /**
     * Determines if two vertices share an edge/connection
     *
     * @memberOf Graph
     * @param {(string|number)} source The vertex to check
     * @param {(string|number)} connection The vertex being checked against source
     * @returnss {boolean} Returns true/false if vertices share an edge
     */
    isDirectConnection(source, connection) {
        return this.hasVertex(source)
            ? this.__data__
                .get(source)
                .includes(connection)
            : false
    }

    /**
     * Determines if two vertices share an indirect edge/connection
     *
     * @memberOf Graph
     * @param {(string|number)} source The vertex to check
     * @param {(string|number)} connection The vertex being checked against source
     * @returnss {boolean} Returns true/false if vertices share an indirect edge/connection
     */
    isIndirectConnection(source, connection) {
        return this.hasVertex(source)
            && this.pathFromTo(source, connection)
            ? true
            : false
    }

    /**
     * List edges/connections of a given vertex
     *
     * @memberOf Graph
     * @param {(string|number)} vertex The vertex to list connections for
     * @returnss {(Array|null)} Returns an array of connections or null if vertex does not exist
     */
    getConnections(vertex) {
        return this.hasVertex(vertex)
            ? this.__data__.get(vertex)
            : null
    }

    /**
     * Determine if the graph has a vertex
     *
     * @memberOf Graph
     * @param {(string|number)} vertex The vertex to check for
     * @returnss {boolean} Returns true/false if Graph has vertex
     */
    hasVertex(vertex) {
        return this.__data__.has(vertex)
            ? true
            : (
              this.__printMsg(vertex),
              false
        )
    }

    /**
     * Internal/external helper to determine if Graph has 2 vertices
     *
     * @memberOf Graph
     * @param {(string|number)} vertexOne The first vertex to check for
     * @param {(string|number)} vertexTwo The second vertex to check for
     * @returnss {boolean} Returns true/false if Graph has vertices
     */
    hasVertices(vertexOne, vertexTwo) {
        return this.hasVertex(vertexOne)
            && this.hasVertex(vertexTwo)
            ? true
            : false
    }

    /**
     * Clear graph of all data
     *
     * @memberOf Graph
     */
    clear() {
        this.__data__.clear()
        this.numEdges = 0
    }

    /**
     * Helper to determine if Graph is empty
     *
     * @memberOf Graph
     * @returnss {boolean} Returns true/false if Graph is empty
     */
    isEmpty() {
        return ![
          ...this.__data__.keys()
        ].length
    }

    /**
     * Helper to determine size of Graph
     *
     * @memberOf Graph
     * @returnss {number} Returns number of vertices in Graph
     */
    get size() {
      return this.__data__.size
    }

    /**
     * Helper to determine number of edges/connections in Graph
     *
     * @memberOf Graph
     * @returnss {number} Returns number of edges in Graph
     */
    get relations() {
      return this.numEdges
    }

    /**
     * Determines the shortest resolvable path between two vertices
     *
     * @memberOf Graph
     * @param {(string|number)} from The vertex to begin traversal from
     * @param {(string|number)} to The vertex to traverse to
     * @returnss {string} Returns a string representing the shortest resolvable path, e.g. 'A -> B -> C'
     */
    pathFromTo(source, destination) {
        if (!this.hasVertex(source))
            return null

        const queue = [ source ]
        const visited = { [source]: true }
        const paths = {}, path = []

        while (queue.length) {
            const vertex = queue.shift()
            const edges = this.__data__.get(vertex)
            for (let i in edges) {
                if (!visited[edges[i]]) {
                    visited[edges[i]] = true
                    paths[edges[i]] = vertex
                    queue.push(edges[i])
                }
            }
        }

        // path does not exist
        if (!visited[destination]) {
            this.__printMsg(source, destination)
            return null
        }

        // resolve path
        for (var j = destination; j != source; j = paths[j]) {
            path.push(j)
        }

        path.push(j)
        return path.reverse().join(' -> ')
    }


    /**
     * Explore the Graph using a breadth-first search
     *
     * @memberOf Graph
     * @param {(number|string)} start The vertex to begin traversal from
     * @returnss {Array} Returns an array of vertices visited in BF order
     */
    breadthFirst(start){
        if (!this.hasVertex(start))
            return null

        const visited = { [start]: true },
              queue = [ start ],
              results = []

        while (queue.length) {
            const nextVertex = queue.shift()
            const adjList = this.__data__.get(nextVertex)

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
     * @param {(number|string)} start The vertex to begin traversal from
     * @returnss {Array} Returns an array of vertices visited in DF order
     */
    depthFirst(start) {
        if (!this.hasVertex(start))
            return null

        const visited = {}

        const traverse = (vertex, results = []) => {

            results.push(vertex)
            visited[vertex] = true
            const adjList = this.__data__.get(vertex)

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
        for (let [key, value] of this.__data__) {
            console.log(\`\${key} -> \${value.join(', ')}\`)
        }
    }

    /**
     * Internal notification util
     * Prints appropriate warning message if vertex/vertices not found
     *
     * @memberOf Graph
     * @param {(string|number)} s The source vertex
     * @param {(string|number)} d The destination vertex
     */
    __printMsg(s, d) {
        return !d
          ? console.log(\`Vertex '\${s}' not found\`)
          : console.log(\`Path from \${s} to \${d} does not exist\`)
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

graph.print()
console.log()

graph.addEdge('Rat', 'Rooster') // no connection added
graph.addEdge('Monkey', 'Rat') // no connection added
graph.addEdge('Rat', 'Ox') // dupe connection not added

console.log('\\nRelations (number of edges):', graph.relations)
console.log('Size (number of vertices):', graph.size)

if (graph.isIndirectConnection('Snake', 'Rat')) {
  console.log('\\nPath from Rat to Snake:', graph.pathFromTo('Rat', 'Snake'))
}

graph.pathFromTo('Rat', 'Monkey')

console.log('\\nSearches:')
console.log('Depth First:', graph.depthFirst('Rat'))
console.log('Breadth First:', graph.breadthFirst('Rat'))

if (graph.isDirectConnection('Rat', 'Dragon') &&
    graph.isDirectConnection('Dragon', 'Snake')
   ) {
    graph.removeEdge('Rat', 'Dragon')
    graph.removeEdge('Snake', 'Dragon')
}

console.log('\\nhandle removing non-existing connection:')
console.log('graph.removeEdge(\\'Dragon\\', \\'Ox\\') ===', graph.removeEdge('Dragon', 'Ox'))

if (graph.isDirectConnection('Tiger', 'Dragon')) {
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
      { href: 'http://blog.benoitvallon.com/data-structures-in-javascript/the-graph-data-structure/', caption: 'Ben\'s Blog, Article & Code'},
      { href: 'https://www.cs.usfca.edu/~galles/visualization/ConnectedComponent.html', caption: 'Interactive Animated Visualization'},
      { href: 'https://visualgo.net/en/dfsbfs', caption: 'VisualAlgo.net: Better Interactive Animated Visualizations!'},
      { href: 'https://en.wikipedia.org/wiki/Adjacency_list', caption: 'Wikipedia'},
  ]
};
