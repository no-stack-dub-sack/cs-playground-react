export default
`/**
  * @class Node
  * @property {number|string} value The node's value
  * @property {object} next The next node
  */

class Node {
    constructor(el) {
        this.el = el;
        this.next = null;
    }
}

/**
 * @class Singly-Linked List data structure
 * @property {object} headNode Root element of collection
 * @property {number} length The length of the list
 * @method head @return {object} root element of collection
 * @method size @return size of List
 * @method add @param {number|string} el Adds element to List
 * @method addAt @param {number} index @param {number|string} el Adds element at specific index
 * @method remove @param {number|string} el @return {number|string} removed element
 * @method removeAt @param {number} index @return {number|string} removed element at specific index
 * @method indexOf @param {number|string} el @return {number} index of a given element
 * @method elementAt @param {number} index @return {number|string} elementAt at specific index
 * @method isEmpty @return {bool}
 */

class LinkedList {
    constructor() {
        this.length = 0;
        this.headNode = null;
    }


    head() {
        return this.headNode;
    }


    get size() {
        return length;
    }


    add(el) {
        var next = new Node(el);
        var currentNode = this.headNode;
        if (!currentNode) {
            this.headNode = next;
        } else {
            while (currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = next;
        }

        length++;
    }


    addAt(index, el) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        var currentNode = this.headNode, previousNode;
        var currentIndex = 0;
        var next = new Node(el);
        if (index === 0) {
            next.next = this.headNode;
            this.headNode = next;
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

        length++;
    }


    remove(el) {
        var currentNode = this.headNode, previousNode;

        if (currentNode.el === el) {
            this.headNode = currentNode.next;
        } else {
            while (currentNode.el !== el) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }

            previousNode.next = currentNode.next;
        }

        length--;
    }


    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        var currentNode = this.headNode, previousNode;
        var currentIndex = 0;
        length--;

        if (index === 0) {
            previousNode = this.headNode;
            this.headNode = currentNode.next;
            return previousNode.el;
        } else {
            while (currentIndex < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            previousNode.next = currentNode.next;
            return currentNode.el;
        }
    }


    indexOf(el) {
        var count = 0;
        var currentNode = this.headNode;
        if (!currentNode) return -1;

        while (el !== currentNode.el) {
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
        var currentNode = this.headNode;

        while (currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        return currentNode.el;
    }


    isEmpty(num) {
        if (!this.headNode) {
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
console.log(JSON.stringify(list.head(), null, 2));
console.log(\`indexOf trains: \${list.indexOf('Trains')}\`);
console.log(\`indexOf trucks: \${list.indexOf('Trucks')}\`);
console.log(\`size: \${list.size}\`);
`;
