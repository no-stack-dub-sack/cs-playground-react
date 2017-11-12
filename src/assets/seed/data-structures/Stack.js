export default {
  title: 'Stack',
  seed:
`class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    // methods to implement:

    // push()
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
  * @property {object} next The next node
  */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
  * @class Stack data structure
  * @property {object} root The root of the collection
  * @property {number} size The size of the collection
  * @method push @param {(number|string)} val Adds an element to the collection
  * @method pop Removes an element from the collection
  * @method peek Returns the element at the top of the Stack
  * @method isEmpty @return bool
  * @method clear Clears the stack
  * @method print Prints the collection to the console
  */

class Stack {
    constructor() {
        this.root = null;
        this.size = 0;
    }


    push(val, node = this.root) {
        if (!node) {
            this.size++;
            this.root = new Node(val);
            return;
        }

        if (!node.next) {
            this.size++;
            node.next = new Node(val);
        } else {
            this.push(val, node.next);
        }
    }


    pop(node = this.root, previousNode = null) {
        if (!node) {
            return undefined;
        }

        if (this.size === 1) {
            this.root = null;
            this.size = 0;
            return node.value;
        }

        if (node.next) {
            return this.pop(node.next, node);
        } else {
            this.size--;
            previousNode.next = null;
            return node.value;
        }
    }


    peek(node = this.root) {
        if (!node) {
            return undefined;
        }

        if (node.next) {
            return this.peek(node.next);
        } else {
            return node.value;
        }
    }


    isEmpty() {
        if (!this.root) {
            return true;
        }

        return false;
    }


    clear() {
        this.root = null;
        this.size = 0;
    }
}

// example usage:

const stack = new Stack();

console.log('isEmpty: ' + stack.isEmpty());

stack.push(23);
stack.push(47);
stack.push(95);

console.log('pop: ' + stack.pop());
console.log('pop: ' + stack.pop());
console.log('pop: ' + stack.pop());
console.log('pop: ' + stack.pop());

[49,27,63,18,11].forEach(num => stack.push(num));

console.log('peek: ' + stack.peek());
console.log('size: ' + stack.size);
console.log('isEmpty: ' + stack.isEmpty());

console.log('\\n' + JSON.stringify(stack, null, 2));

stack.clear();

console.log('\\ncleared:\\n\\n' + JSON.stringify(stack, null, 2));
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/stack-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-stack-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-stack-class', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/stacks', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/StackLL.html', caption: 'Interactive Animated Visualization!'},
  ]
};
