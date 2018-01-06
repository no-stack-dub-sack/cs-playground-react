export default {
  title: 'Linked List',
  seed:
`class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    // methods to implement:

    // peakHead()
    // size()
    // add()
    // addAt()
    // remove()
    // removeAt()
    // indexOf()
    // elementAt()
    // isEmpty()
}
`,
  solution:
`/**
  * @class Node
  * @property {number|string} value The node's value
  * @property {object} next The next node
  */

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

/**
 * @class Singly-Linked List data structure
 * @property {object} head Root element of collection
 * @property {number} length The length of the list
 * @method peakHead @return {object} root element of collection
 * @method size @return size of List
 * @method add @param {number|string} element Adds element to List
 * @method addAt @param {number} index @param {number|string} element Adds element at specific index
 * @method remove @param {number|string} element @return {number|string} removed element
 * @method removeAt @param {number} index @return {number|string} removed element at specific index
 * @method indexOf @param {number|string} element @return {number} index of a given element
 * @method elementAt @param {number} index @return {number|string} elementAt at specific index
 * @method isEmpty @return {boolean}
 */

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }


    peakHead() {
        return this.head;
    }


    get size() {
        return this.length;
    }


    add(element) {
        var next = new Node(element);
        var currentNode = this.head;
        if (!currentNode) {
            this.head = next;
        } else {
            while (currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = next;
        }

        this.length++;
    }


    addAt(index, element) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        var currentNode = this.head, previousNode;
        var currentIndex = 0;
        var next = new Node(element);
        if (index === 0) {
            next.next = this.head;
            this.head = next;
        } else {
            while (currentIndex < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            previousNode.next = next;
            next.next = currentNode;
            currentNode = next;
        }

        this.length++;
    }


    remove(element) {
        var currentNode = this.head, previousNode;

        if (currentNode.element === element) {
            this.head = currentNode.next;
        } else {
            while (currentNode.element !== element) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            previousNode.next = currentNode.next;
        }

        this.length--;
    }


    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        var currentNode = this.head, previousNode;
        var currentIndex = 0;
        this.length--;

        if (index === 0) {
            previousNode = this.head;
            this.head = currentNode.next;
            return previousNode.element;
        } else {
            while (currentIndex < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            previousNode.next = currentNode.next;
            return currentNode.element;
        }
    }


    indexOf(element) {
        var count = 0;
        var currentNode = this.head;
        if (!currentNode) return -1;

        while (element !== currentNode.element) {
            if (currentNode.next === null) {
                return -1;
            }
            currentNode = currentNode.next;
            count++;
        }

        return count;
    }


    elementAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        var currentIndex = 0;
        var currentNode = this.head;

        while (currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        return currentNode.element;
    }


    isEmpty(num) {
        if (!this.head) {
           return true;
        }

        return false;
    }
}

// example usage:

var list = new LinkedList();

list.add('Planes');
list.add('Trains');
list.add('Automobiles');
list.add('Magic Carpets');
console.log(JSON.stringify(list.peakHead(), null, 2));
console.log(\`indexOf trains: \${list.indexOf('Trains')}\`);
console.log(\`indexOf trucks: \${list.indexOf('Trucks')}\`);
console.log(\`size: \${list.size}\`);
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/data-structures/linked-list/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-linkedlist-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/work-with-nodes-in-a-linked-list', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Linked_list', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/linked-lists', caption: 'freeCodeCamp Guides'},
    { href: 'http://www.geeksforgeeks.org/data-structures/linked-list/', caption: 'Interactive Animated Visualization!'},
  ]
};
