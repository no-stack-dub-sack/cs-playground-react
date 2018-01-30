export default {
  title: 'Doubly Linked List',
  seed:
`class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    // methods to implement:

    // peekHead()
    // peekTail()
    // add(value)
    // addAt(index, value)
    // remove(value)
    // removeAt(index)
    // indexOf(value)
    // elementAt(index)
    // isEmpty()
    // reverse()
    // size()
}
`,
  solution:
`/**
 * @class Node
 * @param {*} element
 * @property {*} element The node's value
 * @property {object} prev The previous node
 * @property {object} next The next node
 */

class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

/**
 * @class Doubly-Linked List data structure
 * @property {Object} head Root element of list
 * @property {Object} tail Tail element of list
 * @property {number} length The length of the list
 * @method peekHead @returns {Object} Peek at root element of list
 * @method peekTail @returns {Object} Peek at tail element of list
 * @method add @param {*} element Appends element to tail of list
 * @method addAt @param {number} index @param {*} element Adds element at specific index
 * @method remove @param {*} element @returns {*} Remove and return element from list, return null if no removal
 * @method removeAt @param {number} index @returns {*} Remove and return element at specific index, or null if no removal
 * @method indexOf @param {*} element @returns {number} Return index of a given element or null if element doesn't exist
 * @method elementAt @param {number} index @returns {*} Return element at specific index or null if element doesn't exist
 * @method isEmpty @returns {boolean} Return true if list is empty, false if not
 * @method reverse Reverses the list structure
 * @method size @returns {number} Returns the size of List, can be used interchangably with list.length
 */

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }


    peekHead() {
        if (this.isEmpty()) {
            return null
        }

        return this.head
    }


    peekTail() {
        if (this.isEmpty()) {
            return null
        }

        return this.tail
    }


    add(value) {
        if (this.isEmpty()) {
            this.head = new Node(value)
            this.tail = this.head
            this.length++
            return
        }

        let currentNode = this.head

        while (currentNode.next) {
            currentNode = currentNode.next
        }

        const newNode = new Node(value)
        currentNode.next = newNode
        currentNode.next.prev = currentNode
        this.tail = currentNode.next
        this.length++
    }


    addAt(index, value) {
        if (this.isEmpty()  ||
            index < 0       ||
            index > this.size) {
            return null
        }

        this.length++

        // add at head
        if (index === 0) {
            if (!this.head) {
                this.head = new Node(value)
                this.tail = this.head
                return
            } else {
                const newNode = new Node(value)
                newNode.next = this.head
                this.head.prev = newNode
                this.head = newNode
                return
            }
        }

        // add at tail
        if (index+1 === this.size) {
            const newNode = new Node(value)
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
            return
        }

        let currentIndex = 0
        let previousNode, currentNode = this.head
        while (currentIndex !== index) {
            previousNode = currentNode
            currentNode = currentNode.next
            currentIndex++
        }

        const newNode = new Node(value)
        previousNode.next = newNode
        newNode.prev = previousNode
        newNode.next = currentNode
        currentNode.prev = newNode
    }


    remove(value) {
        if (this.isEmpty()) {
            return null
        }

        // remove head
        if (value === this.head.value) {
            this.head = this.head.next
            if ( this.head) this.head.prev = null
            if (!this.head) this.tail = null
            this.length--
            return true
        }

        // remove tail
        if (value === this.tail.value) {
            this.tail = this.tail.prev
            this.tail.next = null
            this.length--
            return true
        }

        let currentNode = this.head

        while (currentNode.value !== value) {
            if (!currentNode.next) {
                return null
            }

            currentNode = currentNode.next
        }

        this.length--
        currentNode.prev.next = currentNode.next
        currentNode.next.prev = currentNode.prev
        return true
    }


    removeAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null
        }

        this.length--

        // remove at head
        if (index === 0) {
            const deleted = this.head.value
            // remove last node
            if (this.size === 0) {
                this.head = null
                this.tail = null
                return deleted
            }
            this.head = this.head.next
            this.head.prev = null
            return deleted
        }

        // remove at tail
        if (index === this.size) {
            const deleted = this.tail.value
            this.tail = this.tail.prev
            this.tail.next = null
            return deleted
        }

        let currentIndex = 0
        let previousNode, currentNode = this.head
        while (currentIndex !== index) {
            previousNode = currentNode
            currentNode = currentNode.next
            currentIndex++
        }

        previousNode.next = currentNode.next
        currentNode.next.prev = previousNode
        return currentNode.value
    }


    indexOf(value) {
        if (this.isEmpty()) {
            return -1
        }

        let currentNode = this.head
        let currentIndex = 0
        while (value !== currentNode.value) {
            currentNode = currentNode.next
            currentIndex++
            if (!currentNode) {
                return -1
            }
        }

        return currentIndex
    }


    elementAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null
        }

        let currentIndex = 0
        let currentNode = this.head

        while (index !== currentIndex) {
            currentNode = currentNode.next
            currentIndex++
        }

        return currentNode.value
    }


    isEmpty() {
        if (!this.head) {
            return true
        }

        return false
    }


    reverse() {
        if (this.isEmpty()) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            let tempNode = currentNode.next
            currentNode.next = currentNode.prev
            currentNode.prev = tempNode
            currentNode = currentNode.prev
        }

        let tempNode = this.head
        this.head = this.tail
        this.tail = tempNode
    }


    toString() {
        if (this.isEmpty()) {
            return null
        }

        let result = []

        let currentNode = this.head

        while (currentNode) {
            result.push(Object.assign({}, currentNode))
            currentNode = currentNode.next
        }

        result.forEach(node => {
           if (node.prev) node.prev = node.prev.value
           if (node.next) node.next = node.next.value
        })

        return JSON.stringify(result, null, 2)
    }


    get size() {
        return this.length
    }
}

// example usage:

const list = new DoublyLinkedList()

console.log(
\`\\nNote that all print outs of the list are represented as an
Array of nodes simplified by the toString method (next and prev
simply show the next and previous data, NOT the entire node) so
that we can easily see how the list has been modified. We cannot
stringify an un-simplified doubly linked list due to the circular
nature of its previous and next node references! (see bottom)\\n\`
)

list.add('one')
list.add('two')
list.add('three')
list.add('five')
list.add('six')
list.addAt(3, 'four')

console.log('initial list: \\n\\n' + list.toString() + '\\n')

// check node & remove
if (list.elementAt(0) === 'one') {
    console.log(list.remove('one'))
}

list.reverse()

// loop and remove
while (list.size > 1) {
    console.log(\`removed: \${list.removeAt(list.size - 1)} at index: \${list.size-1}\`)
}

console.log('\\n' + list.toString() + '\\n')

// remove last node
list.indexOf('six') === 0 && list.removeAt(0)

// removing the last node should reset both head and tail!
console.log('head:', list.head)
console.log('tail:', list.tail)

/*
 * These are very simple exammples. Can you think of some good real world
 * use cases for a doubly linked list? How about navigating a playlist?
 * A circular doubly linked list could be even more valuable for that!
 * Check out the next challenge to see how we can implement one!
 */

/*
 * NOTE: use the browser's console to log peekHead or peekTail you will get
 * a circular structure whose next/prev elements will expand infinitely (since
 * they just point at each other) -> Node(A) = Node(A).next.prev = Node(A)
 * see an example of this here: http://recordit.co/GT4XT5BVTh
 *
 * Since logging in a terminal is non-interactive, logging a doubly linked list
 * in a Node environment would look something like this (notice the [Circular]
 * notation in Node.next.prev):
 *
 * Node {
 *   value: 'one',
 *   prev: null,
 *   next:
 *    Node {
 *      value: 'two',
 *      prev: [Circular],
 *      next: Node { value: 'three', prev: [Object], next: [Object] } } }
 */
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/data-structures/linked-list/#doublyLinkedList/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2009/04/21/computer-science-in-javascript-doubly-linked-lists/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-doubly-linked-list', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Doubly_linked_list', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/linked-list', caption: 'freeCodeCamp Guides'},
    { href: 'https://visualgo.net/en/list', caption: 'VisualAlgo.net Interactive Animated Visualization'},
  ]
}
