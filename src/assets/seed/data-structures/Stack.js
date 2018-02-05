export default {
  title: 'Stack',
  seed:
`class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor() {
        this.root = null
        this.size = 0
    }

    // methods to implement:

    // push(value)
    // pop()
    // peek()
    // isEmpty()
    // clear()
    // print()
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
  * @class Stack data structure
  * @property {?Object.<Node>} root The root of the collection
  * @property {number} size The size of the collection
  * @method push @param {(number|string)} value Adds an element to the collection
  * @method pop @returns {(number|string)} Removes the top node from the stack and returns its value
  * @method peek @returns {(number|string)} Returns the value of the node at the top of the Stack
  * @method isEmpty @returns {boolean}
  * @method clear Clears the stack
  * @method print Prints the collection to the console
  */

class Stack {
    constructor() {
        this.root = null
        this.size = 0
    }


    push(value) {
        const node = new Node(value)

        if (this.root === null) {
            this.root = node
        } else {
            node.next = this.root
            this.root = node
        }

        this.size++
    }


    pop() {
        if (this.isEmpty()) return null

        const value = this.root.value
        this.root = this.root.next
        this.size--

        return value
    }


    peek() {
        return this.root
            ? this.root.value
            : null
    }


    isEmpty() {
        return this.size === 0
    }


    clear() {
        this.root = null
        this.size = 0
    }

    print() {
        console.log(JSON.stringify(this, null, 2))
    }
}

// example usage:

const stack = new Stack()

console.log('isEmpty: ' + stack.isEmpty())

stack.push(23)
stack.push(47)
stack.push(95)

console.log('pop: ' + stack.pop())
console.log('pop: ' + stack.pop())
console.log('pop: ' + stack.pop())
console.log('pop: ' + stack.pop());

[49,27,63,18,11]
  .forEach(num => stack.push(num))

console.log('peek: ' + stack.peek())
console.log('size: ' + stack.size)
console.log('isEmpty: ' + stack.isEmpty() + '\\n')

stack.print()
stack.clear()
console.log('\\ncleared:\\n\\n')
stack.print()
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/stack-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-stack-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-stack-class', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/stacks', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/StackLL.html', caption: 'Interactive Animated Visualization!'},
    { href: 'https://visualgo.net/en/list', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
