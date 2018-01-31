export const tail = `
if (typeof new BinarySearchTree() === 'object') {
  BinarySearchTree.prototype.__isBinarySearchTree__ = function() {
    if (this.root === null) {
      return null
    } else {
      var check = true
      function checkTree(node) {
        if (node.left != null) {
          var left = node.left
          if (left.value > node.value) {
            check = false
          } else {
            checkTree(left)
          }
        }
        if (node.right != null) {
          var right = node.right
          if (right.value < node.value) {
            check = false
          } else {
            checkTree(right)
          }
        }
      }
      checkTree(this.root)
      return check
    }
  }
  BinarySearchTree.prototype.__inOrder__ = function(node = this.root, list = []) {
    if (!node) {
      return null
    }

    this.__inOrder__(node.left, list)
    list.push(node.value)
    this.__inOrder__(node.right, list)

    return list
  }
  BinarySearchTree.prototype.__clearTree__ = function() {
    this.root = null
    return true
  }
  BinarySearchTree.prototype.__isNodeValid__ = function() {
    if (typeof this.root.value === 'undefined' ||
        typeof this.root.right === 'undefined' ||
        typeof this.root.left === 'undefined') {
      console.log(
        'WARNING: Nodes must have <code>value</code>, <code>left</code> and <code>right</code> properties for tests to work!'
      )
    }
  }
}

let __tree__
const testHooks = {
  beforeAll: () => {
    __tree__ = new BinarySearchTree()
  },
  beforeEach: () => {
    __tree__.__clearTree__()
  },
  afterAll: () => {
    __tree__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __tree__ === 'object'`,
    message: 'The <code>BinarySearchTree</code> data structure exists'
  },
  {
    expression: `__tree__.root === null`,
    message: `The <code>BinarySearchTree</code> data structure has a <code>root</code> property which initializes to a value of <code>null</code>`
  },
  {
    expression: `typeof __tree__.add === 'function'`,
    message: 'The binary search tree has a method called <code>add</code>: <span class="type">@param {number}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      [4,1,7,87,34,45,73,8]
        .forEach(n => __tree__.add(n))
      __tree__.__isNodeValid__()
      return (__tree__.__isBinarySearchTree__())
    })()
    `,
    message: 'The <code>add</code> method adds elements according to the binary search tree rules'
  },
  {
    expression: `
    (() => {
      __tree__.add(4)
      return __tree__.add(4) === null
    })()
    `,
    message: 'Adding an element that already exists returns <code>null</code>'
  },
  {
    expression: `typeof __tree__.findMin === 'function'`,
    message: 'The binary search tree has a method called <code>findMin</code>'
  },
  {
    expression:
      `(() => {
        [4,1,7,87,34,45,73,8]
          .forEach(n => __tree__.add(n))
        return __tree__.findMin() === 1
      })()
    `,
    message: 'The <code>findMin</code> method returns the minimum value in the binary search tree'
  },
  {
    expression: `typeof __tree__.findMax === 'function'`,
    message: 'The binary search tree has a method called <code>findMax</code>'
  },
  {
    expression:
      `(() => {
        [4,1,7,87,34,45,73,8]
          .forEach(n => __tree__.add(n))
        return __tree__.findMax() === 87
      })()
    `,
    message: 'The <code>findMax</code> method returns the maximum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        return __tree__.findMin() === null && __tree__.findMax() === null
      })()
    `,
    message: 'The <code>findMin</code> and <code>findMax</code> methods return <code>null</code> for an empty tree'
  },
  {
    expression: `typeof __tree__.isPresent === 'function'`,
    message: 'The binary search tree has a method called <code>isPresent</code>: <span class="type">@param {number}</span> <code>value</code>'
  },
  {
    expression: `
      (() => {
        [4,7,411,452].forEach(n => __tree__.add(n))
        return __tree__.isPresent(452) && __tree__.isPresent(411) && __tree__.isPresent(7) && !__tree__.isPresent(100)
      })()
    `,
    message: 'The <code>isPresent</code> method correctly checks for the presence or absence of elements added to the tree'
  },
  {
    expression: `__tree__.isPresent(5) === false`,
    message: '<code>isPresent</code> handles cases where the tree is empty'
  },
  {
    expression: `typeof __tree__.remove === 'function'`,
    message: 'The binary search tree has a method called <code>remove</code>: <span class="type">@param {number}</span> <code>value</code>'
  },
  {
    expression: `__tree__.remove(100) === null`,
    message: 'The <code>remove</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        [5,94,3].forEach(n => __tree__.add(n))
        return (__tree__.remove(100) === null)
      })()
    `,
    message: 'Trying to remove an element that does not exist returns <code>null</code>'
  },
  {
    expression: `
      (() => {
        __tree__.add(500)
        __tree__.remove(500)
        return (__tree__.__inOrder__() === null)
      })()
    `,
    message: 'If the root node has no children, deleting it sets the root to <code>null</code>'
  },
  {
    expression: `
      (() => {
        [5,3,7,6,10,12].forEach(n => __tree__.add(n))
        ;[3,12,10].forEach(n => __tree__.remove(n))
        return __tree__.__inOrder__().join('') === '567'
      })()
    `,
    message: 'The <code>remove</code> method removes leaf nodes from the tree'
  },
  {
    expression: `
      (() => {
        [-1,3,7,16].forEach(n => __tree__.add(n))
        ;[16,7,3].forEach(n => __tree__.remove(n))
        return __tree__.__inOrder__().join('') === '-1'
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with one child'
  },
  {
    expression: `
      (() => {
        __tree__.add(15)
        __tree__.add(27)
        __tree__.remove(15)
        return __tree__.__inOrder__().join('') === '27'
      })()
    `,
    message: 'Removing the root in a tree with two nodes sets the second to be the root'
  },
  {
    expression: `
      (() => {
        [1,4,3,7,9,11,14,15,19,50]
          .forEach(n => __tree__.add(n))
        const removeNum = [9, 11, 14, 19, 3, 50, 15]
        for (let num of removeNum) {
          __tree__.remove(num)
          if (!__tree__.__isBinarySearchTree__()) {
            return false
          }
        }
        return __tree__.__inOrder__().join('') === '147'
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with two children while maintaining the binary search tree structure'
  },
  {
    expression: `
      (() => {
        [100,50,300]
          .forEach(n => __tree__.add(n))
        __tree__.remove(100)
        return __tree__.__inOrder__().join('') === '50300'
      })()`,
    message: 'The root can be removed on a tree of three nodes'
  },
  {
    expression: `
      (() => {
        [7,1,9,0,3,8,10,2,5,4,6].forEach(n => __tree__.add(n))
        return __tree__.inOrder().join('') === '012345678910'
      })()
    `,
    message: 'The <code>inOrder</code> method returns an array of the node values that result from an <code>inOrder</code> traversal'
  },
  {
    expression: `__tree__.inOrder() === null`,
    message: 'The <code>inOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMinHeight')) {
          return 'DISABLED'
        }
        [4,1,7,87,34,45,73,8]
          .forEach(n => __tree__.add(n))
        return __tree__.findMinHeight() === 1
      })()
    `,
    message: 'The <code>findMinHeight</code> method returns the minimum height of the tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMaxHeight')) {
          return 'DISABLED'
        }
        [4,1,7,87,34,45,73,8]
          .forEach(n => __tree__.add(n))
        return __tree__.findMaxHeight() === 5
      })()
    `,
    message: 'The <code>findMaxHeight</code> method returns the maximum height of the tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMaxHeight') &&
            isTestDisabled(BinarySearchTree, 'findMaxHeight')) {
          return 'DISABLED'
        }
        const minHeight = __tree__.findMaxHeight() === -1
        const maxHeight = __tree__.findMaxHeight() === -1
        return minHeight && maxHeight
      })()`,
    message: 'The <code>findMaxHeight</code> and <code>findMinHeight</code> methods return a height of <code>-1</code> when called on an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'isBalanced')) {
          return 'DISABLED'
        }
        [50,17,76,9,23,54,14,19,72,12,67]
          .forEach(n => __tree__.add(n))
        return __tree__.isBalanced()
      })()
    `,
    message: 'The <code>isBalanced</code> method returns true if the tree is a balanced binary search tree (the tree\'s min height and max height diff is <= 1)'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'preOrder')) {
          return 'DISABLED'
        }
        const TEST_1 = __tree__.preOrder() === null
        ;[7,1,9,0,3,8,10,2,5,4,6].forEach(n => __tree__.add(n))
        const TEST_2 = __tree__.preOrder().join('') === '710325469810'
        return TEST_1 && TEST_2
      })()
    `,
    message: 'The <code>preOrder</code> method returns an array of values representing the tree nodes explored in pre order, or <code>null</code> if the tree is empty'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'postOrder')) {
          return 'DISABLED'
        }
        const TEST_1 = __tree__.postOrder() === null
        ;[7,1,9,0,3,8,10,2,5,4,6].forEach(n => __tree__.add(n))
        const TEST_2 = __tree__.postOrder().join('') === '024653181097'
        return TEST_1 && TEST_2
      })()
    `,
    message: 'The <code>postOrder</code> method returns an array of values representing the tree nodes explored in post order, or <code>null</code> if the tree is empty'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'levelOrder')) {
          return 'DISABLED'
        }
        const TEST_1 = __tree__.levelOrder() === null
        ;[7,1,9,0,3,8,10,2,5,4,6].forEach(n => __tree__.add(n))
        const TEST_2 = __tree__.levelOrder().join('') === '719038102546'
        return TEST_1 && TEST_2
      })()
    `,
    message: 'The <code>levelOrder</code> method returns an array of values representing the tree nodes explored in level order, or <code>null</code> if the tree is empty'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'reverseLevelOrder')) {
          return 'DISABLED'
        }
        const TEST_1 = __tree__.reverseLevelOrder() === null
        ;[7,1,9,0,3,8,10,2,5,4,6].forEach(n => __tree__.add(n))
        const TEST_2 = __tree__.reverseLevelOrder().join('') === '791108305264'
        return TEST_1 && TEST_2
      })()
    `,
    message: 'The <code>reverseLevelOrder</code> method returns an array of values representing the tree nodes explored in reverse level order, or <code>null</code> if the tree is empty'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'invert')) {
          return 'DISABLED'
        }
        const TEST_1 = __tree__.invert() === null
        ;[4,1,7,87,34,45,73,8].forEach(n => __tree__.add(n))
        __tree__.invert()
        return __tree__.__inOrder__().join('') === '877345348741'
      })()
    `,
    message: 'The <code>invert</code> method correctly inverts the tree structure, or returns <code>null</code> if the tree is empty'
  }
]
