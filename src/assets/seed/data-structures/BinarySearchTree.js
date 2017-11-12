export default {
  title: 'Binary Search Tree',
  seed:
`class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // methods to implement:

    // add()
    // findMin()
    // findMax()
    // isPresent(int)
    // findMaxHeight()
    // findMinHeight()
    // isBalanced()
    // inOrder()
    // preOrder()
    // postOrder()
    // levelOrder()
    // reverseLevelOrder()
    // remove()
    // invert()
}
`,
  solution:
`// queue helper class node
class QNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

// helper class for levelOrder and reverseLevelOrder methods
class Queue {
    constructor() {
        this.root = null;
    }

    enqueue(val) {
        if (!this.root) {
            this.root = new QNode(val);
            return;
        }

        let node = this.root;
        while (node.next) {
            node = node.next;
        }

        node.next = new QNode(val);
    }

    dequeue() {
        if (!this.root) {
            return null;
        }
        let val = this.root.value;
        this.root = this.root.next;

        return val;
    }

    get isEmpty() {
        if (!this.root) {
            return true;
        }

        return false;
    }
}

var q = new Queue();

/**
  * @class Node
  * @property value The node's value
  * @property left The node's left child
  * @property right The node's right child
  */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
  * @class BinarySearchTree
  * @method add Adds a node to the tree @param {number}
  * @method findMin @return {number} Returns the smallest value in the tree
  * @method findMax @return {number} Returns the greatest value in the tree
  * @method isPresent @param {number} @return {boolean} Whether or not a value is present in the tree
  * @method findMaxHeight @return {number} Returns the greatest depth (from root to furthest leaf)
  * @method findMinHeight @return {number} Returns the smallest depth (from root to furthest leaf)
  * @method isBalanced @return {boolean} Whether or not the left and right depth difference is <= 1
  * @method preOrder @return {number[]} An array of the tree's values arranged in preOrder
  * @method postOrder @return {number[]} An array of the tree's values arranged in postOrder
  * @method levelOrder @return {number[]} An array of the tree's values arranged in levelOrder
  * @method reverseLevelOrder @return {number[]} An array of the tree's values arranged in reverseLevelOrder
  * @method remove @param {number} val @return {number} Removes and returns the removed element
  * @method invert Inverts the tree in place
  */

class BinarySearchTree {
    constructor() {
        this.root = null;
    }


    add(int, node = this.root) {
        if (!this.root) {
            this.root = new Node(int);
            return;
        }

        if (int > node.value) {
            if (!node.right) {
                node.right = new Node(int);
                return;
            } else {
                return this.add(int, node.right);
            }
        } else if (int < node.value) {
            if (!node.left) {
                node.left = new Node(int);
                return;
            } else {
                return this.add(int, node.left);
            }
        }

        return null;
    }


    findMin(node = this.root) {
        if (!node) {
            return null;
        }

        if (node.left) {
            return this.findMin(node.left);
        }

        return node.value;
    }


    findMax(node = this.root) {
        if (!node) {
            return null;
        }

        if (node.right) {
            return this.findMax(node.right);
        }

        return node.value
    }


    isPresent(int, node = this.root) {
        if (!node) {
            return false;
        }

        if (int === node.value) {
            return true;
        } else if (int > node.value && node.right) {
            return this.isPresent(int, node.right);
        } else if (int < node.value && node.left) {
            return this.isPresent(int, node.left);
        }

        return false;
    }


    findMaxHeight(node = this.root) {
        if (!node) {
            return -1;
        }

        var leftHeight = this.findMaxHeight(node.left);
        var rightHeight = this.findMaxHeight(node.right);

        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }


    findMinHeight(node = this.root) {
        if (!node) {
            return -1;
        }

        var leftHeight = this.findMinHeight(node.left);
        var rightHeight = this.findMinHeight(node.right);

        if (leftHeight < rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }


    isBalanced() {
        var maxHeight = this.findMaxHeight();
        var minHeight = this.findMinHeight();
        if (maxHeight - minHeight >= 1) {
            return false;
        } else {
            return true;
        }
    }


    inOrder(node = this.root, list = []) {
        if (!node) {
            return null;
        }

        this.inOrder(node.left, list);
        list.push(node.value);
        this.inOrder(node.right, list);

        return list;
    }


    preOrder(node = this.root, list = []) {
        if (!node) {
            return null;
        }

        list.push(node.value);
        this.preOrder(node.left, list);
        this.preOrder(node.right, list);

        return list;
    }


    postOrder(node = this.root, list = []) {
        if (!node) {
            return null;
        }

        this.postOrder(node.left, list);
        this.postOrder(node.right, list);
        list.push(node.value);

        return list;
    }


    levelOrder() {
        if (!this.root) {
            return null;
        }

        const arr = [];
        q.enqueue(this.root);

        while (!q.isEmpty) {
            let node = q.dequeue();
            arr.push(node.value);

            if (node.left) {
                q.enqueue(node.left);
            }

            if (node.right) {
                q.enqueue(node.right);
            }
        }

        return arr;
    }


    reverseLevelOrder() {
        if (!this.root) {
            return null;
        }

        const arr = [];
        q.enqueue(this.root);

        while (!q.isEmpty) {
            let node = q.dequeue();
            arr.push(node.value);

            if (node.right) {
                q.enqueue(node.right);
            }

            if (node.left) {
                q.enqueue(node.left);
            }
        }

        return arr;
    }


    remove(val) {
        if (!this.root) {
            return null;
        }

        const { target, parent } = this.searchTree(val, this.root);

        if (!target) {
            return null;
        }

        // count children
        let children = 0;
        if (target.right) children++;
        if (target.left) children++;

        // remove leaf node
        if (!children) {
            if (!parent) {
                this.root = null;
                return;
            }

            if (parent.left && parent.left.value === val) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        // remove node with 1 child
        if (children === 1) {
            if (!parent) {
                if (target.left) {
                    this.root = target.left;
                } else {
                    this.root = target.right;
                }
                return;
            }

            if (parent.left && parent.left.value === val) {
                if (target.left) {
                    parent.left = target.left;
                } else {
                    parent.left = target.right;
                }
            } else {
                if (target.left) {
                    parent.right = target.left;
                } else {
                    parent.right = target.right;
                }
            }
        }

        // remove node w/ 2 children
        if (children === 2) {
            if (!parent && target.right && target.left && this.findMaxHeight() === 1) {
                this.root.value = target.right.value;
                target.right = null;
                return;
            }

            var findMin = (minRight, minRightParent) => {
                if (minRight.left) {
                    return findMin(minRight.left, minRight);
                }

                return { minRight, minRightParent };
            };

            var { minRight, minRightParent } = findMin(target.right, target);

            target.value = minRight.value;

            if (!minRight.left && !minRight.right) {
                if (minRightParent.left.value === minRight.value) {
                    minRightParent.left = null;
                } else {
                    minRightParent.right = null;
                }
            } else {
                minRightParent.left = minRight.right;
            }
        }
    }


    // helper method for deletion actions
    // tracks matching node and parent node
    searchTree(val, node, parent) {
        if (val === node.value) {
            return {
                target: node,
                parent
            };
        } else if (val < node.value && node.left) {
            return this.searchTree(val, node.left, node);
        } else if (val > node.value && node.right) {
            return this.searchTree(val, node.right, node);
        }

        return {
            target: null,
            parent: null
        };
    }


    invert(node = this.root) {
        if (!node) {
            return null;
        }

        var tempNode = node.left;
        node.left = node.right;
        node.right = tempNode;

        this.invert(node.left);
        this.invert(node.right);
    }
}

var tree = new BinarySearchTree();

/*
 * Tests
 */

 const vals = [20,9,49,5,23,52,15,50,17,18,16,13,10,11,12];
 vals.forEach(val => tree.add(val));

console.log(\`findMax: \${tree.findMax()}\`);
console.log(\`findMin: \${tree.findMin()}\`);
console.log(\`isPresent: \${tree.isPresent(47)}\`);
console.log(\`isPresent: \${tree.isPresent(4)}\`);
console.log(\`maxHeight: \${tree.findMaxHeight()}\`);
console.log(\`minHeight: \${tree.findMinHeight()}\`);
console.log(\`isBalanced: \${tree.isBalanced()}\`);
console.log(\`inorder: \${JSON.stringify(tree.inOrder())}\`);
console.log(\`preorder: \${JSON.stringify(tree.preOrder())}\`);
console.log(\`postorder: \${JSON.stringify(tree.postOrder())}\`);
console.log(\`levelOrder: \${JSON.stringify(tree.levelOrder())}\`);
console.log(\`reverseLevelOrder: \${JSON.stringify(tree.reverseLevelOrder())}\`);

console.log('\\nbefore deletion:\\n')
console.log(JSON.stringify(tree, null, 2));

tree.remove(50); // remove leaf node
tree.remove(13); // remove node w/ one child
tree.remove(9); // remove node w/ two children

tree.invert();

console.log('\\nafter deletion and inversion:\\n');
console.log(JSON.stringify(tree, null, 2));
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/binary-search-tree-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/', caption: 'GeeksforGeeks.org JavaScript Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/add-a-new-element-to-a-binary-search-tree', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Binary_search_tree', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/binary-search-trees', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/BST.html', caption: 'Interactive Animated Visualization!'},
  ]
};
