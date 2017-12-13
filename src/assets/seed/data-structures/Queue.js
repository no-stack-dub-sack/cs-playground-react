export default {
  title: 'Queue',
  seed:
`class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.root = null;
    }

    // methods to implement:

    // enqueue()
    // dequeue()
    // front()
    // isEmpty()
    // get size()
}
`,
  solution:
`/**
  * @class Node
  * @property value The node's value
  * @property next The next node in the queue
  */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
  * @class Queue
  * @property {Object} root The root node of the queue
  * @method enqueue @param {*} value @param {Object} [node=this.root]
  * @method dequeue @return {*} Removes and returns the front node's value
  * @method front @return {*} Returns but DOES NOT return the front node's value
  * @method isEmpty @return {boolean}
  * @method size @return {number} Returns the queue's size
  */

class Queue {
    constructor() {
        this.root = null;
    }


    enqueue(value, node = this.root) {
        if (!node) {
            this.root = new Node(value);
            return;
        }

        if (node.next) {
            return this.enqueue(value, node.next);
        } else {
            node.next = new Node(value);
        }
    }


    enqueueIterative(value, node = this.root) {
        if (!node) {
            this.root = new Node(value);
            return;
        }

        while (node.next) {
            node = node.next;
        }

        node.next = new Node(value);
    }


    dequeue() {
        if (!this.root) {
            return null;
        }

        const value = this.root.value;
        this.root = this.root.next;

        return value;
    }


    front() {
        if (!this.root) {
            return null;
        }

        return this.root.value;
    }


    isEmpty() {
        if (!this.root) {
            return true;
        }

        return false;
    }


    get size() {
        if (!this.root) {
            return 0;
        }

        let size = 1;
        let node = this.root;
        while (node.next) {
            node = node.next;
            size++;
        }

        return size;
    }
}

const q = new Queue();

console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);

q.enqueue(7);
q.enqueue(10);
q.enqueue(9);
q.enqueue(47);

console.log(JSON.stringify(q, null, 2));

console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);
console.log(\`front: \${q.front()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`front: \${q.front()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/queue-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-queue-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-queue-class', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Queue_(abstract_data_type)', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/queues', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/QueueLL.html', caption: 'Interactive Animated Visualization!'},
  ]
};
