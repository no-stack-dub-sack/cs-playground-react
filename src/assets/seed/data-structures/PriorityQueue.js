export default {
  title: 'Priority Queue',
  seed:
`// Note: there are many ways to implement a priority queue, this implementation is very similar to a linked
// list, except nodes are inserted according to priority and the lowest priority nodes are always dequeued first.
// Other priority queue implementations might use a 2d array with priority/value pairs as the data store.

class PQNode {
    constructor(value, priority) {
        this.value = value
        this.priority = priority
        this.next = null
    }
}

class PriorityQueue {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    // methods to implement:

    // enqueue(value, priority)
    // dequeue()
    // front()
    // isEmpty()
    // contains(value)
    // priorityOf(value)
    // elementAt(priority)
    // print()
}
`,
  solution:
`/**
 * @class Node
 * @property value The node's value / data
 * @property priority The node's priority
 * @property next The next node in the queue
 */

class PQNode {
    constructor(value, priority) {
        this.value = value
        this.priority = priority
        this.next = null
    }
}

/**
 * @class Queue priority queue data structure
 * @property {Object} root The root node of the priority queue
 * @property {number} size The priority queue's size
 * @method enqueue @property {(number|string)} value @property {number} priority Enqueues node based on priority
 * @method dequeue @returns {(number|string)} Removes and returns the front node's value (lowest priority node)
 * @method front @returns {(number|string)} Returns but DOES NOT return the front node's value
 * @method contains @param value {(number|string)} @returns {boolean} Returns true/false if element is present in queue
 * @method priorityOf @param value {(number|string)} @returns {(number|string)} Returns priority of the given element
 * @method elementAt @param priority {number} @returns {(number|string)} Returns element at the given priority
 * @method isEmpty @returns {boolean}
 */

// NOTE:
// lowest priority takes precedence
// equal priorities are dequeued by insertion order

class PriorityQueue {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }


    enqueue(value, priority) {
        if (typeof priority !== 'number') {
          return null
        }

        this.size++

        // insert first node
        if (!this.head) {
            this.head = new PQNode(value, priority)
            this.tail = this.head
            return
        }

        // insert at head
        if (priority < this.head.priority) {
            const newNode = new PQNode(value, priority)
            newNode.next = this.head
            this.head = newNode
            return
        }

        // insert at tail
        if (priority > this.tail.priority) {
            this.tail.next = new PQNode(value, priority)
            this.tail = this.tail.next
            return
        }

        // insert in body
        const insert = (node) => {
            if (priority >= node.priority && priority < node.next.priority) {
                const newNode = new PQNode(value, priority)
                newNode.next = node.next
                node.next = newNode
                return
            }

            return insert(node.next)
        }

        return insert(this.head)
    }


    dequeue() {
        if (!this.head) {
            return null
        }

        const value = this.head.value
        this.head = this.head.next
        this.size--

        return value
    }


    front() {
        if (!this.head) {
            return null
        }

        return this.head.value
    }


    isEmpty() {
        if (!this.head) {
            return true
        }

        return false
    }


    contains(value) {
        return this.__search(value) ? true : false
    }


    priorityOf(value) {
        const isNode = this.__search(value)
        return !isNode ? null : isNode.priority
    }


    elementAt(priority) {
        if (typeof priority !== 'number') return null
        const isNode = this.__search(null, priority)
        return !isNode ? null : isNode.value
    }


    // '__' dangle denotes "private"/internal use method
    __search(value, priority, node = this.head) {
        if (!node) {
            return false
        }
        if (node.value === value || node.priority === priority) {
            return node
        }
        return this.__search(value, priority, node.next)
    }


    print() {
        if (!this.head) {
            return null
        }

        return JSON.stringify(this.head, null, 2)
    }
}

// example usage:

const pQueue = new PriorityQueue()

pQueue.enqueue('five', 5)
pQueue.enqueue('ten', 10)
pQueue.enqueue('zero', 0)
pQueue.enqueue('three', 3)
pQueue.enqueue('nine', 9)
pQueue.enqueue('nine-a', 9)
pQueue.enqueue('twenty-four', 24)

console.log(pQueue.print() + '\\n')
console.log('size: ' + pQueue.size)
console.log('front: ' + pQueue.front())

console.log('element at priority 3: ' + pQueue.elementAt(3))
console.log('element at priority 4: ' + pQueue.elementAt(4))
console.log('priority of \\'five\\': ' + pQueue.priorityOf('five'))
console.log('priority of \\'foo\\': ' + pQueue.priorityOf('foo'))
console.log('contains \\'nine\\': ' + pQueue.contains('nine'))
console.log('contains \\'cool\\': ' + pQueue.contains('cool'))

while (pQueue.size > 1) {
    console.log('dequeue: ' + pQueue.dequeue())
}

console.log('size: ' + pQueue.size + '\\n')
console.log(pQueue.print())
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/priority-queue-set-1-introduction/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-priority-queue-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-priority-queue-class', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Priority_queue', caption: 'Wikipedia'},
  ]
}
