export default {
  title: 'Binary Search Tree',
  seed:
`class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    // methods to implement:

    // add(value)
    // remove(value)
    // findMin()
    // findMax()
    // isPresent(value)
    // findMaxHeight()
    // findMinHeight()
    // isBalanced()
    // inOrder()
    // preOrder()
    // postOrder()
    // levelOrder()
    // reverseLevelOrder()
    // invert()
}
`,
  solution:
`/**
  * @class Node
  * @property value The node's value
  * @property left The node's left child
  * @property right The node's right child
  */

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

/**
  * @class BinarySearchTree
  * @method add Adds a node to the tree @param {number}
  * @method remove @param {number} value @returns {number} Removes and returns the removed element
  * @method findMin @returns {number} Returns the smallest value in the tree
  * @method findMax @returns {number} Returns the greatest value in the tree
  * @method isPresent @param {number} @returns {boolean} Whether or not a value is present in the tree
  * @method findMaxHeight @returns {number} Returns the greatest depth (from root to furthest leaf)
  * @method findMinHeight @returns {number} Returns the smallest depth (from root to furthest leaf)
  * @method isBalanced @returns {boolean} Whether or not the left and right depth difference is <= 1
  * @method inOrder @returns {number[]} An array of the tree's values arranged inOrder
  * @method preOrder @returns {number[]} An array of the tree's values arranged in preOrder
  * @method postOrder @returns {number[]} An array of the tree's values arranged in postOrder
  * @method levelOrder @returns {number[]} An array of the tree's values arranged in levelOrder
  * @method reverseLevelOrder @returns {number[]} An array of the tree's values arranged in reverseLevelOrder
  * @method invert Inverts the tree in place
  */

class BinarySearchTree {
    constructor() {
        this.root = null
        this.size = 0
    }


    add(value) {
        if (!this.root) {
            this.size++
            this.root = new Node(value)
            return
        }

        const add = (value, node) => {
            if (value > node.value) {
                if (!node.right) {
                    this.size++
                    node.right = new Node(value)
                    return
                } else {
                    return add(value, node.right)
                }
            } else if (value < node.value) {
                if (!node.left) {
                    this.size++
                    node.left = new Node(value)
                    return
                } else {
                    return add(value, node.left)
                }
            }
            // element already exists
            return null
        }

        return add(value, this.root)
    }


    remove(value) {
        if (!this.root) {
            return null
        }

        const { target, parent } = this.__searchTree(value, this.root)

        if (!target) {
            return null
        }

        // decrement size of list
        this.size--

        // count children
        let children = 0
        if (target.right) children++
        if (target.left) children++

        // remove leaf node
        if (!children) {
            if (!parent) {
                this.root = null
                return
            }

            if (parent.left && parent.left.value === value) {
                parent.left = null
            } else {
                parent.right = null
            }
        }

        // remove node with 1 child
        if (children === 1) {
            if (!parent) {
                if (target.left) {
                    this.root = target.left
                } else {
                    this.root = target.right
                }
                return
            }

            if (parent.left && parent.left.value === value) {
                if (target.left) {
                    parent.left = target.left
                } else {
                    parent.left = target.right
                }
            } else {
                if (target.left) {
                    parent.right = target.left
                } else {
                    parent.right = target.right
                }
            }
        }

        // remove node w/ 2 children
        if (children === 2) {
            if (!parent && target.right && target.left) {
                this.root.value = target.right.value
                target.right = null
                return
            }

            var findMin = (minRight, minRightParent) => {
                if (minRight.left) {
                    return findMin(minRight.left, minRight)
                }

                return { minRight, minRightParent }
            }

            var { minRight, minRightParent } = findMin(target.right, target)

            target.value = minRight.value

            if (!minRight.left && !minRight.right) {
                if (minRightParent.left.value === minRight.value) {
                    minRightParent.left = null
                } else {
                    minRightParent.right = null
                }
            } else {
                minRightParent.left = minRight.right
            }
        }
    }


    findMin() {
        if (!this.root) {
            return null
        }

        const findMin = (node) => {
            return node.left
                ? findMin(node.left)
                : node.value
        }

        return findMin(this.root)
    }


    findMax() {
        if (!this.root) {
            return null
        }

        const findMax = (node) => {
            return node.right
                ? findMax(node.right)
                : node.value
        }

        return findMax(this.root)
    }


    isPresent(value) {
        if (!this.root) {
            return false
        }

        const isPresent = (value, node) => {
            if (value === node.value) {
                return true
            } else if (value > node.value && node.right) {
                return isPresent(value, node.right)
            } else if (value < node.value && node.left) {
                return isPresent(value, node.left)
            }
            return false
        }

        return isPresent(value, this.root)
    }


    findMaxHeight() {
        const height = (node) => {
            if (!node) {
                return -1
            }

            var leftHeight = height(node.left)
            var rightHeight = height(node.right)

            return leftHeight > rightHeight
                ? leftHeight + 1
                : rightHeight + 1
        }
        return height(this.root)
    }


    findMinHeight() {
        const height = (node) => {
            if (!node) {
                return -1
            }

            var leftHeight = height(node.left)
            var rightHeight = height(node.right)

            return leftHeight < rightHeight
                ? leftHeight + 1
                : rightHeight + 1
        }
        return height(this.root)
    }


    isBalanced() {
        return this.findMinHeight() > (this.findMaxHeight() - 1)
            ? false
            : true
    }


    inOrder() {
        if (!this.root) {
            return null
        }

        const traverse = (node, list) => {
            if (node) {
                traverse(node.left, list)
                list.push(node.value)
                traverse(node.right, list)
                return list
            }
        }

        return traverse(this.root, [])
    }


    preOrder() {
        if (!this.root) {
            return null
        }

        const traverse = (node, list) => {
            if (node) {
                list.push(node.value)
                traverse(node.left, list)
                traverse(node.right, list)
                return list
            }
        }

        return traverse(this.root, [])
    }


    postOrder() {
        if (!this.root) {
          return null
        }

        const traverse = (node, list) => {
            if (node) {
                traverse(node.left, list)
                traverse(node.right, list)
                list.push(node.value)
                return list
            }
        }

        return traverse(this.root, [])
    }


    levelOrder() {
        if (!this.root) {
            return null
        }

        const results = [], q = []
        q.push(this.root)

        while (q.length) {
            let node = q.shift()
            results.push(node.value)

            if (node.left) {
                q.push(node.left)
            }

            if (node.right) {
                q.push(node.right)
            }
        }

        return results
    }


    reverseLevelOrder() {
        if (!this.root) {
            return null
        }

        const results = [], q = []

        q.push(this.root)

        while (q.length) {
            let node = q.shift()
            results.push(node.value)

            if (node.right) {
                q.push(node.right)
            }

            if (node.left) {
                q.push(node.left)
            }
        }

        return results
    }


    invert() {
        if (!this.root) {
            return null
        }

        const invert = (node) => {
            if (node) {
              var tempNode = node.left
              node.left = node.right
              node.right = tempNode

              invert(node.left)
              invert(node.right)
            }
        }

        invert(this.root)
    }

    // helper method for deletion actions
    // tracks matching node and parent node
    __searchTree(value, node, parent) {
        if (value === node.value) {
            return {
                target: node,
                parent
            }
        } else if (value < node.value && node.left) {
            return this.__searchTree(value, node.left, node)
        } else if (value > node.value && node.right) {
            return this.__searchTree(value, node.right, node)
        }

        return {
            target: null,
            parent: null
        }
    }
}

var tree = new BinarySearchTree()

// example usage

const vals = [20,9,49,5,23,52,15,50,17,18,16,13,10,11,12]
vals.forEach(value => tree.add(value))

console.log(\`findMax: \${tree.findMax()}\`)
console.log(\`findMin: \${tree.findMin()}\`)
console.log(\`isPresent: \${tree.isPresent(47)}\`)
console.log(\`isPresent: \${tree.isPresent(4)}\`)
console.log(\`maxHeight: \${tree.findMaxHeight()}\`)
console.log(\`minHeight: \${tree.findMinHeight()}\`)
console.log(\`isBalanced: \${tree.isBalanced()}\`)
console.log(\`inorder: \${JSON.stringify(tree.inOrder())}\`)
console.log(\`preorder: \${JSON.stringify(tree.preOrder())}\`)
console.log(\`postorder: \${JSON.stringify(tree.postOrder())}\`)
console.log(\`levelOrder: \${JSON.stringify(tree.levelOrder())}\`)
console.log(\`reverseLevelOrder: \${JSON.stringify(tree.reverseLevelOrder())}\`)

console.log('\\nbefore deletion:\\n')
console.log(JSON.stringify(tree, null, 2))

tree.remove(50) // remove leaf node
tree.remove(13) // remove node w/ one child
tree.remove(9) // remove node w/ two children

tree.invert()

console.log('\\nafter deletion and inversion:\\n')
console.log(JSON.stringify(tree, null, 2))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/binary-search-tree-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'http://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/', caption: 'GeeksforGeeks.org JS Implementation'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/add-a-new-element-to-a-binary-search-tree', caption: 'freeCodeCamp Challenge Series'},
    { href: 'https://en.wikipedia.org/wiki/Binary_search_tree', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/binary-search-trees', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.nczonline.net/blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/BST.html', caption: 'Interactive Animated Visualization!'},
    { href: 'https://visualgo.net/en/bst?slide=1', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
