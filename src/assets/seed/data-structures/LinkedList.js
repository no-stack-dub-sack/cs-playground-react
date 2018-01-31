export default {
  title: 'Linked List',
  seed:
`class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }

    // methods to implement:

    // peekHead()
    // size()
    // add(value)
    // addAt(index)
    // remove(value)
    // removeAt(index)
    // indexOf(value)
    // elementAt(index)
    // isEmpty()
}
`,
  solution:
`/**
  * @class Node
  * @property {(number|string)} value The node's value
  * @property {?Object.<Node>} next The next node
  */

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

/**
 * @class Singly-Linked List data structure
 * @property {?Object.<Node>} head Root node of collection
 * @property {number} length The length of the list
 * @method peekHead @returns {?Object.<Node>} root node of collection
 * @method size @returns {number} size of List
 * @method add @param {(number|string)} value Adds node to List
 * @method addAt @param {number} index @param {(number|string)} value Adds node at specific index
 * @method remove @param {(number|string)} value @returns {?(number|string)} removed element
 * @method removeAt @param {number} index @returns {?(number|string)} removed element at specific index
 * @method indexOf @param {(number|string)} value @returns {number} index of a given element
 * @method elementAt @param {number} index @returns {?(number|string)} elementAt at specific index
 * @method isEmpty @returns {boolean}
 */

class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }


    peekHead() {
        return this.head
    }


    get size() {
        return this.length
    }


    add(value) {
        var newNode = new Node(value)
        if (!this.head) {
            this.head = newNode
        } else {
            var currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }

            currentNode.next = newNode
        }

        this.length++
        return true
    }


    addAt(index, value) {
        if (index < 0 || index >= this.size) {
            return null
        }

        var currentNode = this.head, previousNode
        var currentIndex = 0
        var next = new Node(value)
        if (index === 0) {
            next.next = this.head
            this.head = next
        } else {
            while (currentIndex < index) {
                previousNode = currentNode
                currentNode = currentNode.next
                currentIndex++
            }

            previousNode.next = next
            next.next = currentNode
            currentNode = next
        }

        this.length++
        return true
    }


    remove(value) {
        if (this.isEmpty()) {
          return null
        }

        if (this.head.value === value) {
            this.length--
            this.head = this.head.next
            return true
        }

        var currentNode = this.head, previousNode
        while (currentNode.value !== value) {
            previousNode = currentNode
            currentNode = currentNode.next
            // no match found
            if (!currentNode) {
              return null
            }
        }

        this.length--
        previousNode.next = currentNode.next
        return true
    }


    removeAt(index) {
        if (index < 0        ||
            this.isEmpty()   ||
            index >= this.size) {
            return null
        }

        // remove from head
        if (index === 0) {
            var removed = this.head.value
            this.head = this.head.next
            this.length--
            return removed
        }

        // remove from body / tail
        var currentNode = this.head,
            previousNode,
            currentIndex = 0

        while (currentIndex < index) {
            previousNode = currentNode
            currentNode = currentNode.next
            currentIndex++
        }

        this.length--
        previousNode.next = currentNode.next
        return currentNode.value

        /* NOTE: this method could be significantly improved
        if a 'tail' were added to this structure. Think about
        removing the last item in the list. We have to iterate
        all the way to the end, and with long lists this can be
        quite time consuming. A direct reference to the last item
        could prevent this worst-case with a simple equality check.
        I've left it like this for now to illustrate this point, but
        feel free to try to implement this on your own! We'll add a
        tail to our next structure, the doubly linked list. */
    }


    indexOf(value) {
        var count = 0
        var currentNode = this.head
        if (!currentNode) return -1

        while (value !== currentNode.value) {
            if (currentNode.next === null) {
                return -1
            }
            currentNode = currentNode.next
            count++
        }

        return count
    }


    elementAt(index) {
        if (index < 0 || index >= this.size) {
            return null
        }

        var currentIndex = 0
        var currentNode = this.head

        while (currentIndex < index) {
            currentNode = currentNode.next
            currentIndex++
        }

        return currentNode.value
    }


    isEmpty(num) {
        if (!this.head) {
           return true
        }

        return false
    }
}

// example usage:

var list = new LinkedList()

list.add('Planes')
list.add('Trains')
list.add('Automobiles')
list.add('Magic Carpets')
console.log(JSON.stringify(list.peekHead(), null, 2))
console.log(\`indexOf trains: \${list.indexOf('Trains')}\`)
console.log(\`indexOf trucks: \${list.indexOf('Trucks')}\`)
console.log(\`size: \${list.size}\`)
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/data-structures/linked-list/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-linkedlist-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/work-with-nodes-in-a-linked-list', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Linked_list', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/linked-lists', caption: 'freeCodeCamp Guides'},
    { href: 'https://visualgo.net/en/list', caption: 'VisualAlgo.net Interactive Animated Visualization'},
  ]
}
