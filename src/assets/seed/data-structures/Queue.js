export default {
  title: 'Queue',
  seed:
`class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor() {
        this.root = null
        this.length = 0
    }

    // methods to implement:

    // enqueue(value)
    // dequeue()
    // front()
    // isEmpty()
    // size()
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
        this.value = value
        this.next = null
    }
}

/**
  * @class Queue
  * @property {Object} root The root node of the queue
  * @property {Object} tail The tail node of the queue
  * @property {number} length The length of the queue
  * @method enqueue @param {*} value Insert elements into the queue, O(1)
  * @method enqueueLinearTime @param {*} value Insert elements into the queue, O(n)
  * @method dequeue @returns {*} Removes and returns the front node's value
  * @method front @returns {*} Returns but DOES NOT return the front node's value
  * @method isEmpty @returns {boolean}
  * @method size @returns {number} Returns the queue's length
  */

class Queue {
    constructor() {
        this.root = null
        this.tail = null
        this.length = 0
    }


    /* without a reference to the tail node,
    this structure would only have O(1) deletion.
    By simply adding a tail, we can efficiently
    insert and delete elements from the queue in
    constant time. See the below method for how
    this looks in linear, O(n) time. */
    enqueue(value) {
        const node = new Node(value)
        if (!this.root) {
            this.root = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = this.tail.next
        }
        this.length++
    }


    /* We must iterate over the list to
    enqueue, resulting in O(n) time, a
    major disadvantage for large lists */
    enqueueLinearTime(value) {
        if (!this.root) {
            this.root = new Node(value)
        } else {
            let node = this.root
            while (node.next) {
                node = node.next
            }
            node.next = new Node(value)
        }
        this.length++
    }


    dequeue() {
        if (!this.root) {
            return null
        }

        this.length--
        const value = this.root.value
        this.root = this.root.next
        return value
    }


    front() {
        if (!this.root) {
            return null
        }

        return this.root.value
    }


    isEmpty() {
        if (!this.root) {
            return true
        }

        return false
    }


    get size() {
        return this.length
    }
}

// example usage:

const q = new Queue()

console.log(\`size: \${q.size}\`)
console.log(\`isEmpty: \${q.isEmpty()}\`)

q.enqueue(7)
q.enqueue(10)
q.enqueue(9)
q.enqueue(47)

console.log(JSON.stringify(q, null, 2))

console.log(\`size: \${q.size}\`)
console.log(\`isEmpty: \${q.isEmpty()}\`)
console.log(\`front: \${q.front()}\`)
console.log(\`dequeue: \${q.dequeue()}\`)
console.log(\`dequeue: \${q.dequeue()}\`)
console.log(\`dequeue: \${q.dequeue()}\`)
console.log(\`front: \${q.front()}\`)
console.log(\`dequeue: \${q.dequeue()}\`)
console.log(\`size: \${q.size}\`)
console.log(\`isEmpty: \${q.isEmpty()}\`)
console.log(\`dequeue: \${q.dequeue()}\`)
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/queue-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-queue-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-queue-class', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Queue_(abstract_data_type)', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/queues', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/QueueLL.html', caption: 'Interactive Animated Visualization!'},
    { href: 'https://visualgo.net/en/list', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
