export default {
  title: 'Priority Queue',
  seed:
`class PQNode {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // methods to implement:

    // enqueue()
    // dequeue()
    // front()
    // isEmpty()
    // print()
}
`,
  solution:
`/**
  * @class Node
  * @property element The node's value / data
  * @property priority The node's priority
  * @property next The next node in the queue
  */

class PQNode {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
        this.next = null;
    }
}

/**
  * @class Queue
  * @property {Object} root The root node of the priority queue
  * @method enqueue @property {*} element @property {number} priority Enqueues node based on priority
  * @method dequeue @return {*} Removes and returns the front node's value (lowest priority node)
  * @method front @return {*} Returns but DOES NOT return the front node's value
  * @method size @return {number} Returns the queue's size
  * @method isEmpty @return {boolean}
  */

  // NOTE:
  // lowest priority takes precedence
  // equal priorities are dequeued by insertion order

class PriorityQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


    enqueue(element, priority) {
        this.size++;

        if (!this.head) {
            this.head = new PQNode(element, priority);
            this.tail = this.head;
            return;
        }

        // insert at head
        if (priority < this.head.priority) {
            const newNode = new PQNode(element, priority);
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        // insert at tail
        if (priority > this.tail.priority) {
            this.tail.next = new PQNode(element, priority);
            this.tail = this.tail.next;
            return;
        }

        // insert in body
        const insert = (node) => {
            if (priority >= node.priority && priority < node.next.priority ) {
                const newNode = new PQNode(element, priority);
                newNode.next = node.next;
                node.next = newNode;
                return;
            }

            return insert(node.next)
        }

        return insert(this.head);
    }


    dequeue() {
        if (!this.head) {
            return null;
        }

        const element = this.head.element;
        this.head = this.head.next;
        this.size--;

        return element;
    }


    front() {
        if (!this.head) {
            return null;
        }

        return this.head.element;
    }


    isEmpty() {
        if (!this.head) {
            return true;
        }

        return false;
    }


    contains(element) {
        return this.__search(element) ? true : false;
    }


    priorityOf(element) {
        const isNode = this.__search(element);
        return !isNode ? null : isNode.priority;
    }


    elementAt(priority) {
        const isNode = this.__search(null, priority);
        return !isNode ? null : isNode.element;
    }


    // '__' dangle denotes "private"/internal use method
    __search(element, priority, node = this.head) {
        if (!node) {
            return false;
        }
        if (node.element === element || node.priority === priority) {
            return node;
        }
        return this.__search(element, priority, node.next);
    }


    print() {
        if (!this.head) {
            return true;
        }

        return JSON.stringify(this.head, null, 2);
    }
}

// example usage:

const pQueue = new PriorityQueue();

pQueue.enqueue('five', 5);
pQueue.enqueue('ten', 10);
pQueue.enqueue('zero', 0);
pQueue.enqueue('three', 3);
pQueue.enqueue('nine', 9);
pQueue.enqueue('nine-a', 9);
pQueue.enqueue('twenty-four', 24);

console.log(pQueue.print() + '\\n');
console.log('size: ' + pQueue.size);
console.log('front: ' + pQueue.front());

console.log('element at priority 3: ' + pQueue.elementAt(3));
console.log('element at priority 4: ' + pQueue.elementAt(4));
console.log('contains \\'nine\\': ' + pQueue.contains('nine'));
console.log('contains \\'cool\\': ' + pQueue.contains('cool'));

while (pQueue.size > 1) {
    console.log('dequeue: ' + pQueue.dequeue());
}

console.log('size: ' + pQueue.size + '\\n');
console.log(pQueue.print());
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/priority-queue-set-1-introduction/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-priority-queue-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-priority-queue-class', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Priority_queue', caption: 'Wikipedia'},
  ]
}
