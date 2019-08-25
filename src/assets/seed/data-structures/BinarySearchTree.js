export default {
	title: 'Binary Search Tree',
	seed: `class Node {
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
	solution: `/**
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
  * @method add Adds a node or nodes to the tree @param {...number}
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
	}

	// allow for adding an indeterminate amount
	// of values at a time with rest operator
	add(...values) {
		const _add = (value, node = this.root) => {
			const newNode = new Node(value)
			if (!node) {
				this.root = newNode
				return
			}

			if (value === node.value) {
				console.error('Value already exists in tree - no new node added')
				return
			}

			if (value > node.value) {
				if (node.right) return _add(value, node.right)
				node.right = newNode
				return
			} else {
				if (node.left) return _add(value, node.left)
				node.left = newNode
				return
			}
		}

		for (const value of values) {
			_add(value)
		}
	}

	remove(value, node = this.root, firstItr = true) {
		if (!node) {
			return null
		} else if (value > node.value) {
			node.right = this.remove(value, node.right, false)
		} else if (value < node.value) {
			node.left = this.remove(value, node.left, false)
		} else {
			// node is leaf node
			if (!node.left && !node.right) {
				// handle edge case of deleting the root
				// of a single node tree, and use extra
				// argument to prevent this behavior from
				// acting on a newly set root node as the
				// result of a recursive call. Else, this
				// disrupts handling of other edge case of
				// deleting root from a tree with 3 nodes
				if (firstItr) {
					this.root = null
				} else {
					node = null
				}
			}
			// node only has right child
			else if (!node.left) {
				node.value = node.right.value
				node.left = node.right.left
				node.right = node.right.right
			}
			// node only has left child
			else if (!node.right) {
				node.value = node.left.value
				node.right = node.left.right
				node.left = node.left.left
			}
			// node has 2 children
			else {
				const rightSubTreeMin = this.findMin(node.right)
				node.value = rightSubTreeMin
				node.right = this.remove(rightSubTreeMin, node.right, false)
			}
		}

		return node
	}

	// DEPTH FIRST TRAVERSALS

	// left -> root -> right
	inOrder() {
		if (!this.root) {
			return null;
		}

		const result = [],
			stack = [];
		let currentNode = this.root;

		while (currentNode || stack.length) {
			if (currentNode) {
				stack.push(currentNode);
				currentNode = currentNode.left;
			} else {
				const top = stack.pop();
				result.push(top.value);
				currentNode = top.right;
			}
		}

		return result;
	}

	recursiveInOrder(node = this.root, result = []) {
		if (!node) {
			return null
		}

		if (node) {
			this.recursiveInOrder(node.left, result)
			result.push(node.value)
			this.recursiveInOrder(node.right, result)
		}

		return result
	}

	// root -> left -> right
	preOrder() {
		if (!this.root) {
			return null;
		}

		const result = [],
			stack = [];
		let currentNode = this.root;

		while (currentNode || stack.length) {
			if (currentNode) {
				stack.push(currentNode);
				result.push(currentNode.value);
				currentNode = currentNode.left;
			} else {
				const top = stack.pop();
				currentNode = top.right;
			}
		}

		return result;
	}

	recursivePreOrder(node = this.root, result = []) {
		if (!node) {
			return null
		}

		if (node) {
			result.push(node.value)
			this.recursivePreOrder(node.left, result)
			this.recursivePreOrder(node.right, result)
		}

		return result
	}

	// left -> right -> root
	postOrder() {
		if (!this.root) return null;

		const stack = [this.root],
			result = [];

		while (stack.length) {
			const top = stack.pop();
			result.unshift(top.value);
			if (top.left) stack.push(top.left);
			if (top.right) stack.push(top.right);
		}

		return result;
	}

	recursivePostOrder(node = this.root, result = []) {
		if (!node) {
			return null
		}

		if (node) {
			this.recursivePostOrder(node.left, result)
			this.recursivePostOrder(node.right, result)
			result.push(node.value)
		}

		return result
	}

	// BREADTH FIRST TRAVERSALS

	levelOrder() {
		if (!this.root) return null;

		const queue = [this.root],
			result = [];

		while (queue.length) {
			const front = queue.shift();
			result.push(front.value);
			if (front.left) queue.push(front.left);
			if (front.right) queue.push(front.right);
		}

		return result;

	}

	reverseLevelOrder() {
		if (!this.root) return null;

		const queue = [],
			result = [];
		queue.push(this.root);

		while (queue.length) {
			const front = queue.shift();
			result.push(front.value);
			if (front.right) queue.push(front.right);
			if (front.left) queue.push(front.left);
		}

		return result;

	}

	// iterative example
	// must accept a node as an argument instead of being initialized
	// within the method in order to be correctly utilized by the
	// remove method when deleting a node with 2 children
	findMin(currentNode = this.root) {
		if (!currentNode) return null

		let min

		while (currentNode) {
			min = currentNode.value
			currentNode = currentNode.left
		}

		return min
	}

	// recursive example
	findMax(node = this.root) {
		if (!node) {
			return null
		}

		if (node.right) {
			return this.findMax(node.right)
		}

		return node.value
	}

	isPresent(value, node = this.root) {
		if (!node) {
			return false
		}

		if (value === node.value) {
			return true
		} else if (value > node.value && node.right) {
			return this.isPresent(value, node.right)
		} else if (value < node.value && node.left) {
			return this.isPresent(value, node.left)
		}

		return false
	}

	findMaxHeight(node = this.root) {
		if (!node) {
			return -1
		}

		var leftHeight = this.findMaxHeight(node.left)
		var rightHeight = this.findMaxHeight(node.right)

		return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1
	}

	findMinHeight(node = this.root) {
		if (!node) {
			return -1
		}

		var leftHeight = this.findMinHeight(node.left)
		var rightHeight = this.findMinHeight(node.right)

		return rightHeight > leftHeight ? leftHeight + 1 : rightHeight + 1
	}

	isBalanced() {
		if (this.findMinHeight() > (this.findMaxHeight() - 1)) {
			return false
		}
		return true
	}

	invert(node = this.root) {
		if (!node) {
			return null
		}

		var tempNode = node.left
		node.left = node.right
		node.right = tempNode

		this.invert(node.left)
		this.invert(node.right)
	}
}

const tree = new BinarySearchTree()

// example usage

tree.add(20, 9, 49, 5, 23, 52, 15, 50, 17, 18, 16, 13, 10, 11, 12)

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
	resources: [{
			href: 'http://www.geeksforgeeks.org/binary-search-tree-data-structure/',
			caption: 'GeeksforGeeks.org'
		},
		{
			href: 'http://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/',
			caption: 'GeeksforGeeks.org JS Implementation'
		},
		{
			href: 'https://learn.freecodecamp.org/coding-interview-prep/data-structures/add-a-new-element-to-a-binary-search-tree',
			caption: 'freeCodeCamp Challenge Series'
		},
		{
			href: 'https://en.wikipedia.org/wiki/Binary_search_tree',
			caption: 'Wikipedia'
		},
		{
			href: 'https://guide.freecodecamp.org/algorithms/binary-search-trees',
			caption: 'freeCodeCamp Guides'
		},
		{
			href: 'https://www.nczonline.net/blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/',
			caption: 'NCZOnline Blog (JS Specific)'
		},
		{
			href: 'https://www.cs.usfca.edu/~galles/visualization/BST.html',
			caption: 'Interactive Animated Visualization!'
		},
		{
			href: 'https://visualgo.net/en/bst?slide=1',
			caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'
		},
	]
}
