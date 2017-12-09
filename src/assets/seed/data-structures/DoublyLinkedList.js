export default {
  title: 'Doubly Linked List',
  seed:
`class Node {
    constructor(val) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // methods to implement:

    // peekHead()
    // peekTail()
    // add()
    // addAt()
    // remove()
    // removeAt()
    // indexOf()
    // elementAt()
    // isEmpty()
    // size()
}
`,
  solution:
`/**
  * @class Node
  * @property {number|string} value The node's value
  * @property {object} prev The previous node
  * @property {object} next The next node
  */

class Node {
    constructor(val) {
        this.data = val;
        this.prev = null;
        this.next = null;
    }
}

/**
 * @class Doubly-Linked List data structure
 * @property {Object} head Root element of collection
 * @property {Object} tail Tail element of collection
 * @property {number} length The length of the list
 * @method peekHead @return {Object} root element of collection
 * @method peekTail @return {Object} tail element of collection
 * @method add @param {*} el Adds element to List
 * @method addAt @param {number} index @param {*} el Adds element at specific index
 * @method remove @param {*} el @return {*} removed element or null
 * @method removeAt @param {number} index @return {*} removed element at specific index or null
 * @method indexOf @param {*} el @return {number} index of a given element or null
 * @method elementAt @param {number} index @return {*} elementAt at specific index or null
 * @method isEmpty @return {boolean}
 * @method size @return size of List
 */

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }


    peekHead() {
        if (this.isEmpty()) {
            return null;
        }

        return this.head;
    }


    peekTail() {
        if (this.isEmpty()) {
            return null;
        }

        return this.tail;
    }


    add(val) {
        if (this.isEmpty()) {
            this.head = new Node(val);
            this.tail = this.head;
            this.length++;
            return;
        }

        let currentNode = this.head;

        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        const newNode = new Node(val);
        currentNode.next = newNode;
        currentNode.next.prev = currentNode;
        this.tail = currentNode.next;
        this.length++;
    }


    addAt(index, val) {
        if (this.isEmpty()  ||
            index < 0       ||
            index > this.size) {
            return null;
        }

        this.length++;

        // add at head
        if (index === 0) {
            if (!this.head) {
                this.head = new Node(val);
                this.tail = this.head;
                return;
            } else {
                const newNode = new Node(val);
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
                return;
            }
        }

        // add at tail
        if (index+1 === this.size) {
            const newNode = new Node(val);
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            return;
        }

        let currentIndex = 0;
        let previousNode, currentNode = this.head;
        while (currentIndex !== index) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            currentIndex++;
        }

        const newNode = new Node(val);
        previousNode.next = newNode;
        newNode.prev = previousNode;
        newNode.next = currentNode;
        currentNode.prev = newNode;
    }


    remove(val) {
        if (this.isEmpty()) {
            return null;
        }

        this.length--;

        // remove head
        if (val === this.head.data) {
            this.head = this.head.next;
            this.head.prev = null;
            return val;
        }

        // remove tail
        if (val === this.tail.data) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            return val;
        }

        let currentNode = this.head;

        while (currentNode.data !== val) {
            if (!currentNode.next) {
                return null;
            }

            currentNode = currentNode.next;
        }

        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;

        return val;
    }


    removeAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null;
        }

        this.length--;

        // remove at head
        if (index === 0) {
            const deleted = this.head.data;
            this.head = this.head.next;
            this.head.prev = null;
            return deleted;
        }

        // remove at tail
        if (index === this.size) {
            const deleted = this.tail.data;
            this.tail = this.tail.prev;
            this.tail.next = null;
            return deleted;
        }

        let currentIndex = 0;
        let previousNode, currentNode = this.head;
        while (currentIndex !== index) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            currentIndex++;
        }

        previousNode.next = currentNode.next;
        currentNode.next.prev = previousNode;
        return currentNode.data;
    }


    indexOf(val) {
        if (this.isEmpty()) {
            return null;
        }

        let currentNode = this.head;
        let currentIndex = 0;
        while (val !== currentNode.data) {
            currentNode = currentNode.next;
            currentIndex++;
            if (!currentNode) {
                return -1;
            }
        }

        return currentIndex;
    }


    elementAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null;
        }

        let currentIndex = 0;
        let currentNode = this.head;

        while (index !== currentIndex) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        return currentNode.data;
    }


    isEmpty() {
        if (!this.head) {
            return true;
        }

        return false;
    }


    reverse() {
        if (this.isEmpty()) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            let tempNode = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = tempNode;
            currentNode = currentNode.prev;
        }

        let tempNode = this.head;
        this.head = this.tail;
        this.tail = tempNode;
    }


    toString() {
        if (this.isEmpty()) {
            return null;
        }

        let result = [];

        let currentNode = this.head;

        while (currentNode) {
            result.push(Object.assign({}, currentNode));
            currentNode = currentNode.next;
        }

        result.forEach(node => {
           if (node.prev) node.prev = node.prev.data;
           if (node.next) node.next = node.next.data;
        });

        return JSON.stringify(result, null, 2);
    }


    get size() {
        return this.length;
    }
}

// example usage:

const list = new DoublyLinkedList();

console.log(
\`\\nNote that all print outs of the list are represented as an
Array of nodes simplified by the toString method (next and prev
simply show the next and previous data, NOT the entire node) so
that we can easily see how the list has been modified. We cannot
stringify an un-simplified doubly linked list due to the circular
nature of its previous and next node references! (see bottom)\\n\`
);

list.add('foo');
list.add('bar');
list.add('baz');
list.add('zab');
list.add('oof');
list.add('rab');

console.log('\\nsize: ' + list.size);
console.log('initial list: \\n\\n' + list.toString() + '\\n');

list.remove('foo'); // remove head
list.addAt(0, 'new head');
list.addAt(4, 'new 4th index');
list.addAt(7, 'new tail');

console.log('\\nsize: ' + list.size);
console.log('modified list: \\n\\n' + list.toString() + '\\n');

console.log('\\nremoveAt index 7: ' + list.removeAt(7)); // remove tail
console.log('elementAt index 2: ' + list.elementAt(2));
console.log('indexOf "new tail": ' + list.indexOf('new tail'));
console.log('indexOf "rab": ' + list.indexOf('rab'));

list.reverse();

console.log('\\nsize: ' + list.size);
console.log('reversed list: \\n\\n' + list.toString()  + '\\n');

// Logging an unmodified doubly linked list would look something like this:
// (notice the [Circular] notation in Node.next.prev)

// In a Node environment:

// Node {
//   data: 'rab',
//   prev: null,
//   next:
//    Node {
//      data: 'oof',
//      prev: [Circular],
//      next: Node { data: 'new 4th index', prev: [Object], next: [Object] } } }

// or in a browser environment:
// [object Object]
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/data-structures/linked-list/#doublyLinkedList/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2009/04/21/computer-science-in-javascript-doubly-linked-lists/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-doubly-linked-list', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Doubly_linked_list', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/linked-list', caption: 'freeCodeCamp Guides'},
  ]
};
