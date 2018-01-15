export const tail = `
if (
  typeof BinarySearchTree === 'function' &&
  typeof new BinarySearchTree() === 'object'
) {
  BinarySearchTree.prototype.isBinarySearchTree = function() {
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
  BinarySearchTree.prototype.__inOrder = function(node = this.root, list = []) {
    if (!node) {
      return null;
    }

    this.__inOrder(node.left, list);
    list.push(node.value);
    this.__inOrder(node.right, list);

    return list;
  }
  BinarySearchTree.prototype.__clearTree = function() {
    this.root = null;
    return true;
  }
}

  const checkNodes = (tree) => {
    if (typeof tree.root.value === 'undefined' ||
        typeof tree.root.right === 'undefined' ||
        typeof tree.root.left === 'undefined') {
      console.log('WARNING: Nodes must have <code>value</code>, <code>left</code> and <code>right</code> properties for tests to work!');
    }
  }

  const testTree = new BinarySearchTree();
`;

export const tests = [
  {
    expression: `typeof testTree === 'object'`,
    message: 'The <code>BinarySearchTree</code> data structure exists'
  },
  {
    expression: `testTree.root === null`,
    message: `The <code>BinarySearchTree</code> data structure has a <code>root</code> property which initializes to a value of <code>null</code>`
  },
  {
    expression: `typeof testTree.add === 'function'`,
    message: 'The binary search tree has a method called <code>add</code>'
  },
  {
    expression: `
    (() => {
      testTree.__clearTree();
      testTree.add(4);
      testTree.add(1);
      testTree.add(7);
      testTree.add(87);
      testTree.add(34);
      testTree.add(45);
      testTree.add(73);
      testTree.add(8);
      checkNodes(testTree);
      return (testTree.isBinarySearchTree());
    })()
    `,
    message: 'The <code>add</code> method adds elements according to the binary search tree rules'
  },
  {
    expression: `
    (() => {
      testTree.__clearTree();
      testTree.add(4);
      return testTree.add(4) === null;
    })()
    `,
    message: 'Adding an element that already exists returns <code>null</code>'
  },
  {
    expression: `typeof testTree.findMin === 'function'`,
    message: 'The binary search tree has a method called <code>findMin</code>'
  },
  {
    expression:
      `(() => {
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(1);
        testTree.add(7);
        testTree.add(87);
        testTree.add(34);
        testTree.add(45);
        testTree.add(73);
        testTree.add(8);
        return testTree.findMin() === 1;
      })()
    `,
    message: 'The <code>findMin</code> method returns the minimum value in the binary search tree'
  },
  {
    expression: `typeof testTree.findMax === 'function'`,
    message: 'The binary search tree has a method called <code>findMax</code>'
  },
  {
    expression:
      `(() => {
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(1);
        testTree.add(7);
        testTree.add(87);
        testTree.add(34);
        testTree.add(45);
        testTree.add(73);
        testTree.add(8);
        return testTree.findMax() === 87;
      })()
    `,
    message: 'The <code>findMax</code> method returns the maximum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        testTree.__clearTree();
        return testTree.findMin() === null && testTree.findMax() === null;
      })()
    `,
    message: 'The <code>findMin</code> and <code>findMax</code> methods return <code>null</code> for an empty tree'
  },
  {
    expression: `typeof testTree.isPresent === 'function'`,
    message: 'The binary search tree has a method called <code>isPresent</code>'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(7);
        testTree.add(411);
        testTree.add(452);
        return testTree.isPresent(452) && testTree.isPresent(411) && testTree.isPresent(7) && !testTree.isPresent(100);
      })()
    `,
    message: 'The <code>isPresent</code> method correctly checks for the presence or absence of elements added to the tree'
  },
  {
    expression: `testTree.__clearTree() && testTree.isPresent(5) === false`,
    message: '<code>isPresent</code> handles cases where the tree is empty'
  },
  {
    expression: `typeof testTree.remove === 'function'`,
    message: 'The binary search tree has a method called <code>remove</code>'
  },
  {
    expression: `testTree.__clearTree() && testTree.remove(100) === null`,
    message: 'The <code>remove</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(5);
        testTree.add(94);
        testTree.add(3);
        return (testTree.remove(100) === null);
      })()
    `,
    message: 'Trying to remove an element that does not exist returns <code>null</code>'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(500);
        testTree.remove(500);
        return (testTree.__inOrder() === null);
      })()
    `,
    message: 'If the root node has no children, deleting it sets the root to <code>null</code>'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(5);
        testTree.add(3);
        testTree.add(7);
        testTree.add(6);
        testTree.add(10);
        testTree.add(12);
        testTree.remove(3);
        testTree.remove(12);
        testTree.remove(10);
        return testTree.__inOrder().join('') === '567';
      })()
    `,
    message: 'The <code>remove</code> method removes leaf nodes from the tree'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(-1);
        testTree.add(3);
        testTree.add(7);
        testTree.add(16);
        testTree.remove(16);
        testTree.remove(7);
        testTree.remove(3);
        return testTree.__inOrder().join('') === '-1';
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with one child'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(15);
        testTree.add(27);
        testTree.remove(15);
        return testTree.__inOrder().join('') === '27';
      })()
    `,
    message: 'Removing the root in a tree with two nodes sets the second to be the root'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(1);
        testTree.add(4);
        testTree.add(3);
        testTree.add(7);
        testTree.add(9);
        testTree.add(11);
        testTree.add(14);
        testTree.add(15);
        testTree.add(19);
        testTree.add(50);
        const removeNum = [9, 11, 14, 19, 3, 50, 15];
        for (let num of removeNum) {
          testTree.remove(num);
          if (!testTree.isBinarySearchTree()) {
            return false;
          };
        }
        return testTree.__inOrder().join('') === '147';
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with two children while maintaining the binary search tree structure'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree()
        testTree.add(100);
        testTree.add(50);
        testTree.add(300);
        testTree.remove(100);
        return testTree.__inOrder().join('') === '50300';
      })()
    `,
    message: 'The root can be removed on a tree of three nodes'
  },
  {
    expression: `
      (() => {
        testTree.__clearTree();
        testTree.add(7);
        testTree.add(1);
        testTree.add(9);
        testTree.add(0);
        testTree.add(3);
        testTree.add(8);
        testTree.add(10);
        testTree.add(2);
        testTree.add(5);
        testTree.add(4);
        testTree.add(6);
        return testTree.inOrder().join('') === '012345678910';
      })()
    `,
    message: 'The <code>inOrder</code> method returns an array of the node values that result from an <code>inOrder</code> traversal'
  },
  {
    expression: `
    (() => {
      testTree.__clearTree();
      return testTree.inOrder() === null;
    })()`,
    message: 'The <code>inOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'findMinHeight')) {
          return 'DISABLED';
        }
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(1);
        testTree.add(7);
        testTree.add(87);
        testTree.add(34);
        testTree.add(45);
        testTree.add(73);
        testTree.add(8);
        return testTree.findMinHeight() === 1;
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
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(1);
        testTree.add(7);
        testTree.add(87);
        testTree.add(34);
        testTree.add(45);
        testTree.add(73);
        testTree.add(8);
        return testTree.findMaxHeight() === 5;
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
      testTree.__clearTree();
      const minHeight = testTree.findMaxHeight() === -1;
      const maxHeight = testTree.findMaxHeight() === -1;
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
        testTree.__clearTree();
        testTree.add(50);
        testTree.add(17);
        testTree.add(76);
        testTree.add(9);
        testTree.add(23);
        testTree.add(54);
        testTree.add(14);
        testTree.add(19);
        testTree.add(72);
        testTree.add(12);
        testTree.add(67);
        return testTree.isBalanced();
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
        testTree.__clearTree();
        testTree.add(7);
        testTree.add(1);
        testTree.add(9);
        testTree.add(0);
        testTree.add(3);
        testTree.add(8);
        testTree.add(10);
        testTree.add(2);
        testTree.add(5);
        testTree.add(4);
        testTree.add(6);
        return (testTree.preOrder().join('') === '710325469810');
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
      testTree.__clearTree();
      return testTree.preOrder() === null
    })()`,
    message: 'The <code>preOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'postOrder')) {
          return 'DISABLED';
        }
        testTree.__clearTree();
        testTree.add(7);
        testTree.add(1);
        testTree.add(9);
        testTree.add(0);
        testTree.add(3);
        testTree.add(8);
        testTree.add(10);
        testTree.add(2);
        testTree.add(5);
        testTree.add(4);
        testTree.add(6);
        return testTree.postOrder().join('') === '024653181097';
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
      testTree.__clearTree();
      return testTree.postOrder() === null
    })()`,
    message: 'The <code>postOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'levelOrder')) {
          return 'DISABLED';
        }
        testTree.__clearTree();
        testTree.add(7);
        testTree.add(1);
        testTree.add(9);
        testTree.add(0);
        testTree.add(3);
        testTree.add(8);
        testTree.add(10);
        testTree.add(2);
        testTree.add(5);
        testTree.add(4);
        testTree.add(6);
        return testTree.levelOrder().join('') === '719038102546';
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
      testTree.__clearTree();
      return testTree.levelOrder() === null
    })()`,
    message: 'The <code>levelOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        if (isTestDisabled(BinarySearchTree, 'reverseLevelOrder')) {
          return 'DISABLED';
        }
        testTree.__clearTree();
        testTree.add(7);
        testTree.add(1);
        testTree.add(9);
        testTree.add(0);
        testTree.add(3);
        testTree.add(8);
        testTree.add(10);
        testTree.add(2);
        testTree.add(5);
        testTree.add(4);
        testTree.add(6);
        return testTree.reverseLevelOrder().join('') === '791108305264';
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
      testTree.__clearTree();
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
        testTree.__clearTree();
        testTree.add(4);
        testTree.add(1);
        testTree.add(7);
        testTree.add(87);
        testTree.add(34);
        testTree.add(45);
        testTree.add(73);
        testTree.add(8);
        testTree.invert();
        return testTree.__inOrder().join('') === '877345348741';
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
      testTree.__clearTree();
      return new BinarySearchTree().invert() === null
    })()`,
    message: 'Inverting an empty tree returns <code>null</code>'
  },
];
