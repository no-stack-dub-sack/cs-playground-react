export const tail = `
if (typeof new BinarySearchTree() === 'object') {
  BinarySearchTree.prototype.__isBinarySearchTree__ = function() {
    if (this.root === null) {
      return null;
    } else {
      var check = true;
      function checkTree(node) {
        if (node.left != null) {
          var left = node.left;
          if (left.value > node.value) {
            check = false;
          } else {
            checkTree(left);
          }
        }
        if (node.right != null) {
          var right = node.right;
          if (right.value < node.value) {
            check = false;
          } else {
            checkTree(right);
          };
        };
      };
      checkTree(this.root);
      return check;
    };
  }
  BinarySearchTree.prototype.__inOrder__ = function(node = this.root, list = []) {
    if (!node) {
      return null;
    }

    this.__inOrder__(node.left, list);
    list.push(node.value);
    this.__inOrder__(node.right, list);

    return list;
  }
  BinarySearchTree.prototype.__clearTree__ = function() {
    this.root = null;
    return true;
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

const __tree__ = new BinarySearchTree();

let oldConsoleLog = null

const testHooks = {
  beforeEach: function() {
    __tree__.__clearTree__()
    oldConsoleLog = console.log
    console.log = () => {}
  },
  afterEach: () => {
    console.log = oldConsoleLog
  }
}
`;

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
    message: 'The binary search tree has a method called <code>add</code>'
  },
  {
    expression: `
    (() => {
      __tree__.add(4);
      __tree__.add(1);
      __tree__.add(7);
      __tree__.add(87);
      __tree__.add(34);
      __tree__.add(45);
      __tree__.add(73);
      __tree__.add(8);
      __tree__.__isNodeValid__()
      return (__tree__.__isBinarySearchTree__());
    })()
    `,
    message: 'The <code>add</code> method adds elements according to the binary search tree rules'
  },
  {
    expression: `
    (() => {
      __tree__.add(4);
      return __tree__.add(4) === null;
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
        __tree__.add(4);
        __tree__.add(1);
        __tree__.add(7);
        __tree__.add(87);
        __tree__.add(34);
        __tree__.add(45);
        __tree__.add(73);
        __tree__.add(8);
        return __tree__.findMin() === 1;
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
        __tree__.add(4);
        __tree__.add(1);
        __tree__.add(7);
        __tree__.add(87);
        __tree__.add(34);
        __tree__.add(45);
        __tree__.add(73);
        __tree__.add(8);
        return __tree__.findMax() === 87;
      })()
    `,
    message: 'The <code>findMax</code> method returns the maximum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        return __tree__.findMin() === null && __tree__.findMax() === null;
      })()
    `,
    message: 'The <code>findMin</code> and <code>findMax</code> methods return <code>null</code> for an empty tree'
  },
  {
    expression: `typeof __tree__.isPresent === 'function'`,
    message: 'The binary search tree has a method called <code>isPresent</code>'
  },
  {
    expression: `
      (() => {
        __tree__.add(4);
        __tree__.add(7);
        __tree__.add(411);
        __tree__.add(452);
        return __tree__.isPresent(452) && __tree__.isPresent(411) && __tree__.isPresent(7) && !__tree__.isPresent(100);
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
    message: 'The binary search tree has a method called <code>remove</code>'
  },
  {
    expression: `__tree__.remove(100) === null`,
    message: 'The <code>remove</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        __tree__.add(5);
        __tree__.add(94);
        __tree__.add(3);
        return (__tree__.remove(100) === null);
      })()
    `,
    message: 'Trying to remove an element that does not exist returns <code>null</code>'
  },
  {
    expression: `
      (() => {
        __tree__.add(500);
        __tree__.remove(500);
        return (__tree__.__inOrder__() === null);
      })()
    `,
    message: 'If the root node has no children, deleting it sets the root to <code>null</code>'
  },
  {
    expression: `
      (() => {
        __tree__.add(5);
        __tree__.add(3);
        __tree__.add(7);
        __tree__.add(6);
        __tree__.add(10);
        __tree__.add(12);
        __tree__.remove(3);
        __tree__.remove(12);
        __tree__.remove(10);
        return __tree__.__inOrder__().join('') === '567';
      })()
    `,
    message: 'The <code>remove</code> method removes leaf nodes from the tree'
  },
  {
    expression: `
      (() => {
        __tree__.add(-1);
        __tree__.add(3);
        __tree__.add(7);
        __tree__.add(16);
        __tree__.remove(16);
        __tree__.remove(7);
        __tree__.remove(3);
        return __tree__.__inOrder__().join('') === '-1';
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with one child'
  },
  {
    expression: `
      (() => {
        __tree__.add(15);
        __tree__.add(27);
        __tree__.remove(15);
        return __tree__.__inOrder__().join('') === '27';
      })()
    `,
    message: 'Removing the root in a tree with two nodes sets the second to be the root'
  },
  {
    expression: `
      (() => {
        __tree__.add(1);
        __tree__.add(4);
        __tree__.add(3);
        __tree__.add(7);
        __tree__.add(9);
        __tree__.add(11);
        __tree__.add(14);
        __tree__.add(15);
        __tree__.add(19);
        __tree__.add(50);
        const removeNum = [9, 11, 14, 19, 3, 50, 15];
        for (let num of removeNum) {
          __tree__.remove(num);
          if (!__tree__.__isBinarySearchTree__()) {
            return false;
          };
        }
        return __tree__.__inOrder__().join('') === '147';
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with two children while maintaining the binary search tree structure'
  },
  {
    expression: `
      (() => {
        __tree__.add(100);
        __tree__.add(50);
        __tree__.add(300);
        __tree__.remove(100);
        return __tree__.__inOrder__().join('') === '50300';
      })()
    `,
    message: 'The root can be removed on a tree of three nodes'
  },
  {
    expression: `
      (() => {
        __tree__.add(7);
        __tree__.add(1);
        __tree__.add(9);
        __tree__.add(0);
        __tree__.add(3);
        __tree__.add(8);
        __tree__.add(10);
        __tree__.add(2);
        __tree__.add(5);
        __tree__.add(4);
        __tree__.add(6);
        return __tree__.inOrder().join('') === '012345678910';
      })()
    `,
    message: 'The <code>inOrder</code> method returns an array of the node values that result from an <code>inOrder</code> traversal'
  },
  {
    expression: `
    (() => {
      return __tree__.inOrder() === null;
    })()`,
    message: 'The <code>inOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMinHeight')) {
          return 'DISABLED';
        }
        __tree__.add(4);
        __tree__.add(1);
        __tree__.add(7);
        __tree__.add(87);
        __tree__.add(34);
        __tree__.add(45);
        __tree__.add(73);
        __tree__.add(8);
        return __tree__.findMinHeight() === 1;
      })()
    `,
    message: 'The <code>findMinHeight</code> method returns the minimum height of the tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMaxHeight')) {
          return 'DISABLED';
        }
        __tree__.add(4);
        __tree__.add(1);
        __tree__.add(7);
        __tree__.add(87);
        __tree__.add(34);
        __tree__.add(45);
        __tree__.add(73);
        __tree__.add(8);
        return __tree__.findMaxHeight() === 5;
      })()
    `,
    message: 'The <code>findMaxHeight</code> method returns the maximum height of the tree'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(BinarySearchTree, 'findMaxHeight') &&
          isTestDisabled(BinarySearchTree, 'findMaxHeight')) {
        return 'DISABLED';
      }
      const minHeight = __tree__.findMaxHeight() === -1;
      const maxHeight = __tree__.findMaxHeight() === -1;
      return minHeight && maxHeight;
    })()`,
    message: 'The <code>findMaxHeight</code> and <code>findMinHeight</code> methods return a height of <code>-1</code> when called on an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'isBalanced')) {
          return 'DISABLED';
        }
        __tree__.add(50);
        __tree__.add(17);
        __tree__.add(76);
        __tree__.add(9);
        __tree__.add(23);
        __tree__.add(54);
        __tree__.add(14);
        __tree__.add(19);
        __tree__.add(72);
        __tree__.add(12);
        __tree__.add(67);
        return __tree__.isBalanced();
      })()
    `,
    message: 'The <code>isBalanced</code> method returns true if the tree is a balanced binary search tree (the tree\'s min height and max height diff is <= 1)'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'preOrder')) {
          return 'DISABLED';
        }
        __tree__.add(7);
        __tree__.add(1);
        __tree__.add(9);
        __tree__.add(0);
        __tree__.add(3);
        __tree__.add(8);
        __tree__.add(10);
        __tree__.add(2);
        __tree__.add(5);
        __tree__.add(4);
        __tree__.add(6);
        return (__tree__.preOrder().join('') === '710325469810');
      })()
    `,
    message: 'The <code>preOrder</code> method returns an array of the node values that result from a <code>preOrder</code> traversal'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(BinarySearchTree, 'preOrder')) {
        return 'DISABLED';
      }
      return __tree__.preOrder() === null
    })()`,
    message: 'The <code>preOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'postOrder')) {
          return 'DISABLED';
        }
        __tree__.add(7);
        __tree__.add(1);
        __tree__.add(9);
        __tree__.add(0);
        __tree__.add(3);
        __tree__.add(8);
        __tree__.add(10);
        __tree__.add(2);
        __tree__.add(5);
        __tree__.add(4);
        __tree__.add(6);
        return __tree__.postOrder().join('') === '024653181097';
      })()
    `,
    message: 'The <code>postOrder</code> method returns an array of the node values that result from a <code>postOrder</code> traversal'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(BinarySearchTree, 'postOrder')) {
        return 'DISABLED';
      }
      return __tree__.postOrder() === null
    })()`,
    message: 'The <code>postOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'levelOrder')) {
          return 'DISABLED';
        }
        __tree__.add(7);
        __tree__.add(1);
        __tree__.add(9);
        __tree__.add(0);
        __tree__.add(3);
        __tree__.add(8);
        __tree__.add(10);
        __tree__.add(2);
        __tree__.add(5);
        __tree__.add(4);
        __tree__.add(6);
        return __tree__.levelOrder().join('') === '719038102546';
      })()
    `,
    message: 'The <code>levelOrder</code> method returns an array of the tree node values explored in level order'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(BinarySearchTree, 'levelOrder')) {
        return 'DISABLED';
      }
      return __tree__.levelOrder() === null
    })()`,
    message: 'The <code>levelOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'reverseLevelOrder')) {
          return 'DISABLED';
        }
        __tree__.add(7);
        __tree__.add(1);
        __tree__.add(9);
        __tree__.add(0);
        __tree__.add(3);
        __tree__.add(8);
        __tree__.add(10);
        __tree__.add(2);
        __tree__.add(5);
        __tree__.add(4);
        __tree__.add(6);
        return __tree__.reverseLevelOrder().join('') === '791108305264';
      })()
    `,
    message: 'The <code>reverseLevelOrder</code> method returns an array of the tree node values explored in reverse level order'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(BinarySearchTree, 'reverseLevelOrder')) {
        return 'DISABLED';
      }
      return new BinarySearchTree().reverseLevelOrder() === null;
    })()`,
    message: 'The <code>reverseLevelOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'invert')) {
          return 'DISABLED';
        }
        __tree__.add(4);
        __tree__.add(1);
        __tree__.add(7);
        __tree__.add(87);
        __tree__.add(34);
        __tree__.add(45);
        __tree__.add(73);
        __tree__.add(8);
        __tree__.invert();
        return __tree__.__inOrder__().join('') === '877345348741';
      })()
    `,
    message: 'The <code>invert</code> method correctly inverts the tree structure'
  },
  {
    expression:
    `(() => {
      if (isTestDisabled(BinarySearchTree, 'invert')) {
        return 'DISABLED';
      }
      return new BinarySearchTree().invert() === null
    })()`,
    message: 'Inverting an empty tree returns <code>null</code>'
  },
];
