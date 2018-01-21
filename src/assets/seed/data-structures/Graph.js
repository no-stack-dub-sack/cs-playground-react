export default {
    title: 'Graph',
    seed:
`class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.list = new Map();
    }

    // Methods to Implement:

    // addVertex(vertex)
    // addEdge(source, destination)
    // printGraph()
}
`,
  solution:
`/**
 * @class Graph, Adjacency List Representation
 * @property {number} vertices Number of vertices within the graph.
 * @method addVertex @param {object} vertex The vertex to be added to the Graph
 * @method addEdge @param {object} source @param {object} destination Adds an edge between the source and destination vertices.
 * @method printGraph Prints the vertices and their individual adjacency lists
 */

class Graph {
    constructor() {
        this.list = new Map();
        this.numVertices = 0;
    }


    addVertex(vertex) {
        this.list.set(vertex, []);
        if (!this.list.has(vertex))
            this.numVertices++;
    }


    removeVertex(vertex) {
        if (!this.list.has(vertex)) {
            return null;
        }

        // decrement
        this.numVertices--;

        // remove map[vertex]
        this.list.delete(vertex);

        // remove associated edges
        this.list.forEach((v, k, m) =>
            m.set(k, v.filter(v => v !== vertex))
        );

        return true;
    }


    addEdge(source, destination) {
        // prevent error if vertex does not exist
        if (!this.hasVertices(source, destination)) {
            return null;
        }

        // an undirected graph requires
        // that a connection exists both ways
        this.list.get(source).push(destination);
        this.list.get(destination).push(source);

        return true;
    }


    removeEdge(source, destination) {
        // prevent error if vertex does not exist
        if (!this.hasVertices(source, destination)) {
            return null;
        }

        const srcList = this.list.get(source);
        const destList = this.list.get(destination);

        // delete references to edge at source
        this.list.set(
            source,
            srcList.filter(v => v !== destination)
        );

        // delete references to edge at dest
        this.list.set(
            destination,
            destList.filter(v => v !== source)
        );

        return true;
    }


    hasVertex(vertex) {
      return this.list.has(vertex);
    }


    isConnected(vertexOne, vertexTwo){

    }


    getConnections(){

    }


    clear(){
      
    }


    hasVertices(vertexOne, vertexTwo) {
        if (this.list.has(vertexOne) ||
            this.list.has(vertexTwo)) {
            return true;
        }

        return false;
    }


    breadthFirst(startingVertex){

        const visited = {}, results = [], queue = [];

        visited[startingVertex] = true;
        queue.push(startingVertex);

        while (queue.length) {
            const nextVertex = queue.shift();
            const adjList = this.list.get(nextVertex);

            results.push(nextVertex);

            for (let el of adjList) {
                if (!visited[el]) {
                    visited[el] = true;
                    queue.push(el);
                }
            }

        }

        return results;
    }


    depthFirst(startingVertex) {

        var visited = {};

        const traverse = (vertex, results = []) => {

            results.push(vertex);
            visited[vertex] = true;
            const adjList = this.list.get(vertex);

            for (let el of adjList) {
                if (!visited[el]) {
                    traverse(el, results);
                }
            }

            return results;
        }

        return traverse(startingVertex);
    }


    printGraph() {
        for (let [key, value] of this.list) {
            console.log(\`\${key} -> \${value.join(', ')}\`)
        }
    }
}

// Example Usage:

var graph = new Graph(6);
var vertices = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake'];

for (var i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
}

graph.addEdge('Rat', 'Ox');
graph.addEdge('Rat', 'Bear'); // no edge added
graph.addEdge('Tiger', 'Rabbit');
graph.addEdge('Rat', 'Dragon');
graph.addEdge('Snake', 'Tiger');
graph.addEdge('Tiger', 'Rat');
graph.addEdge('Bear', 'Rat'); // no edge added
graph.addEdge('Dragon', 'Ox');
graph.addEdge('Rabbit', 'Snake');

graph.printGraph();
`,
  resources: [
      { href: 'http://www.geeksforgeeks.org/graph-and-its-representations/', caption: 'GeeksforGeeks.org'},
      { href: 'http://www.geeksforgeeks.org/implementation-graph-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
      { href: 'https://en.wikipedia.org/wiki/Adjacency_list', caption: 'Wikipedia'},
      { href: 'https://www.cs.usfca.edu/~galles/visualization/ConnectedComponent.html', caption: 'Interactive Animated Visualization'},
  ]
};
