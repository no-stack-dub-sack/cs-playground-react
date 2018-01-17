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
    constructor(vertices) {
        this.vertices = vertices;
        this.list = new Map();
    }

    addVertex(vertex) {
        this.list.set(vertex, []);
    }

    // An undirected graph requires that a connection exists both ways
    addEdge(source, destination) {
        this.list.get(source).push(destination);
        this.list.get(destination).push(source);
    }

    printGraph() {
        var vertices = this.list.keys();

    	for (var i of vertices) {
        	var vertexAdjList = this.list.get(i);
        	var vertexConnections = "";

        	for (var j of vertexAdjList) {
            	vertexConnections += (j + " ");
        	}

            console.log(i + " -> " + vertexConnections);
        }
    }
}

// Example Usage:

var graph = new Graph(5);
var vertices = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake'];

for (var i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
}

graph.addEdge('Rat', 'Ox');
graph.addEdge('Tiger', 'Rabbit');
graph.addEdge('Rat', 'Dragon');
graph.addEdge('Snake', 'Tiger');
graph.addEdge('Tiger', 'Rat');
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
