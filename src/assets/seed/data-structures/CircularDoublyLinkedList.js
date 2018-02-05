export default {
  title: 'Circular Doubly Linked List',
  seed:
`/* Note that this implementation should differ from the previous doubly-linked list in it's ability to be forged
into a circular structure, i.e., the tail's next property points to head, while the head's prev property points to
tail. This isn't quite as simple as it sounds though — are there any "Gotcha!"'s you might be able to think of? For
example, think about adding/removing at the head or tail of a circular list, or reversing the list. Happy Hacking! */

// Also, if you used an iterative approach in your last list, trying using recursion this time around, or vice versa!

class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class CircularDoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
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
    // forgeCircular()
    // forgeLinear()
    // isEmpty()
    // reverse()
    // size()
}
`,
  solution:
`/* Note that in addition to being a circular structure, this implementation differs from the previous Linked List
solution in that its methods use a recursive approach to traverse the structure rather than an iterative approach.
Do you think this approach is better or worse? Have you tried both? Check out the last solution for a comparison! */

/**
 * @class Node
 * @property {*} value The node's value
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
 * @class Doubly-Linked List data structure, circular
 * @property {Object} head Root node of list
 * @property {Object} tail Tail node of list
 * @property {number} length The length of the list
 * @property {boolean} isCircular Denotes whether or not the list is circular
 * @method peekHead @return {Object} Peek at root node of list
 * @method peekTail @return {Object} Peek at tail node of list
 * @method add @param {*} value Appends node to tail of list
 * @method addAt @param {number} index @param {*} value Adds node at specific index
 * @method remove @param {*} value @return {*} Remove and return value from list, return null if no removal
 * @method removeAt @param {number} index @return {*} Remove and return value at specific index, or null if no removal
 * @method removeHead @return {*} Remove and return head node, or return null if no removal
 * @method removeTail @return {*} Remove and return tail node, or return null if no removal
 * @method indexOf @param {*} value @return {number} Return index of a given element or null if element doesn't exist
 * @method elementAt @param {number} index @return {*} Return element at specific index or null if element doesn't exist
 * @method forgeCircular Forges a linear list as circular
 * @method forgeLinear Forges a circular list as linear
 * @method isEmpty @return {boolean} Return true if list is empty, false if not
 * @method reverse Reverses the list structure
 * @method size @return {number} Returns the size of List, can be used interchangably with list.length
 */

class CircularDoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
        this.isCircular = false
    }


    peekHead() {
        return !this.isEmpty()
            ? this.head
            : null
    }


    peekTail() {
        return !this.isEmpty()
            ? this.tail
            : null
    }


    add(value) {
        if (this.isEmpty()) {
            this.head = new Node(value)
            this.tail = this.head
            this.length++
            return true
        }

        const add = (node) => {
            const newNode = new Node(value)
            newNode.prev = node
            node.next = newNode
            this.tail = newNode
            this.length++
        }

        const traverse = (node) => {
            if (node.next) {
                if (this.__isCircularLastNode(node.value)) {
                    add(node)
                    this.tail.next = this.head
                    this.head.prev = this.tail
                    return true
                } else {
                    return traverse(node.next)
                }
            }

            add(node)
        }

        return traverse(this.head)
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
                return true
            } else {
                const newNode = new Node(value)
                newNode.next = this.head
                this.head.prev = newNode
                this.head = newNode
                if (this.isCircular)
                    this.head.prev = this.tail
                    this.tail.next = this.head
                return true
            }
        }

        // add at tail
        if (index+1 === this.size) {
            const newNode = new Node(value)
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
            if (this.isCircular)
                this.tail.next = this.head
                this.head.prev = this.tail
            return true
        }

        const addAt = (node, prevNode, currIndex) => {
            if (currIndex !== index) {
                return addAt(node.next, node, currIndex+1)
            }

            const newNode = new Node(value)
            prevNode.next = newNode
            newNode.prev = prevNode
            newNode.next = node
            node.prev = newNode
            return true
        }

        return addAt(this.head.next, this.head, 1)
    }


    remove(value) {
        if (this.isEmpty())
            return null

        // remove at head
        if (value === this.head.value) {
            return this.removeHead()
        }

        // remove at tail
        if (value === this.tail.value) {
            return this.removeTail()
        }

        const traverse = (node) => {
            if (node.value !== value) {
                return !node.next
                    ? null
                    : traverse(node.next)
            }

            this.length--
            node.prev.next = node.next
            node.next.prev = node.prev
            return value
        }

        return traverse(this.head)
    }


    removeAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null
        }

        // remove at head
        if (index === 0) {
            return this.removeHead()
        }

        // remove at tail
        if (index === this.size-1) {
            return this.removeTail()
        }

        const removeAt = (node, prevNode, currIndex) => {
            if (currIndex !== index) {
                return removeAt(node.next, node, currIndex+1)
            }

            this.length--
            prevNode.next = node.next
            node.next.prev = prevNode
            return node.value
        }

        return removeAt(this.head.next, this.head, 1)
    }

    // the following 2 methods were created as internal abstraction,
    // but have reasonable outside application, so not prefixing with
    // '__', which denotes intended for private/internal use only
    removeHead() {
        if (this.isEmpty())
            return null

        const { value } = this.head

        // remove last node
        if (this.size === 1) {
            this.head = null
            this.tail = null
            this.length = 0
            this.isCircular = false
            return value
        }

        this.head = this.head.next
        if (this.isCircular) {
            this.head.prev = this.tail
            this.tail.next = this.head
        } else {
            this.head.prev = null
        }

        this.length--
        return value
    }


    removeTail() {
        if (this.isEmpty())
            return null

        const removed = this.tail.value
        this.tail = this.tail.prev
        if (this.isCircular) {
            this.tail.next = this.head
            this.head.prev = this.tail
        } else {
            this.tail.next = null
        }

        this.length--
        return removed
    }


    indexOf(value) {
        if (this.isEmpty())
            return -1

        const indexOf = (node, index) => {
            if (index === this.size) {
                return -1
            }
            return value === node.value
                ? index
                : indexOf(node.next, index+1)
        }

        return indexOf(this.head, 0)
    }


    elementAt(index) {
        if (this.isEmpty()   ||
            index < 0        ||
            index >= this.size) {
            return null
        }

        const elementAt = (node, currIndex) => {
            return index !== currIndex
                ? elementAt(node.next, currIndex+1)
                : node.value
        }

        return elementAt(this.head, 0)
    }


    forgeCircular() {
        if (this.head) {
            this.head.prev = this.tail
            this.tail.next = this.head
            this.isCircular = true
        } else {
            return null
        }
    }


    forgeLinear() {
        if (this.isCircular) {
            this.head.prev = null
            this.tail.next = null
            this.isCircular = false
        } else {
            return null
        }
    }


    reverse() {
        if (this.isEmpty())
            return null

        let forgeCircular = false
        if (this.isCircular) {
            this.forgeLinear()
            forgeCircular = true
        }

        const reverse = (node) => {
            if (node) {
                let tempNode = node.next
                node.next = node.prev
                node.prev = tempNode
                return reverse(node.prev)
            }

            let tempNode = this.head
            this.head = this.tail
            this.tail = tempNode
        }

        reverse(this.head)
        if (forgeCircular)
            this.forgeCircular()
    }


    isEmpty() {
        return !this.head
            ? true
            : false
    }


    toString() {
        if (this.isEmpty()) {
            return null
        }

        const result = []
        const traverse = (node) => {
            if (node) {
                result.push(Object.assign({}, node))
                return this.__isCircularLastNode(node.value)
                    ? null
                    : traverse(node.next)
            }
        }

        traverse(this.head)

        result.forEach(node => {
           if (node.prev) node.prev = node.prev.value
           if (node.next) node.next = node.next.value
        })

        return JSON.stringify(result, null, 2)
    }


    /* internal use only to determine if
    node is last node of circular list */
    __isCircularLastNode(element) {
        return this.isCircular &&
        this.indexOf(element) === this.size-1
    }


    get size() {
        return this.length
    }
}

// example usage:

const list = new CircularDoublyLinkedList()

console.log(
\`\\nNote that all print outs of the list are represented as an
Array of nodes simplified by the toString method (next and prev
simply show the next and previous value, NOT the entire node) so
that we can easily see how the list has been modified. We cannot
stringify an un-simplified doubly linked list due to the circular
nature of its previous and next node references! (see bottom)\\n\\n\`
)

list.add('one')
list.add('two')

/* make list circular and keep adding. Note:
it's important for forgeCircular to work at
any time that the list isn't empty. */

list.forgeCircular()
list.add('three')
list.add('five')
list.add('six')
list.addAt(3, 'four')
list.addAt(6, 'seven')
list.add('eight')
list.add('nine')
list.add('ten')

function removeIf(expression, element, remove) {
  if (expression === element) {
    console.log(remove)
  } else {
    console.log(null)
  }
}

removeIf(list.elementAt(5), 'six', list.removeAt(5))
removeIf(list.peekHead().value, 'one', list.remove('one'))
removeIf(list.elementAt(5), 'seven', list.removeAt(5))

console.log('\\ncircular list:\\n')
console.log(list.toString())

list.reverse()
list.forgeLinear()

console.log('\\nreversed linear list:\\n')
console.log(list.toString())
`,
  resources: [
    { href: 'https://www.geeksforgeeks.org/doubly-circular-linked-list-set-1-introduction-and-insertion/', caption: 'GeeksforGeeks.org | Part I'},
    { href: 'https://www.geeksforgeeks.org/doubly-circular-linked-list-set-2-deletion/', caption: 'GeeksforGeeks.org | Part II'},
    { href: 'https://en.wikipedia.org/wiki/Doubly_linked_list#Circular_doubly_linked_lists', caption: 'Wikipedia'},
  ]
}
