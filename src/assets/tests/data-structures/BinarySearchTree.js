export const tail = `
  if (
    typeof BinarySearchTree === 'function' &&
    typeof new BinarySearchTree() === 'object'
  )
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
`;

export const tests = [
  {
    expression: `typeof new BinarySearchTree() === 'object'`,
    message: 'The <code>BinarySearchTree</code> data structure exists'
  },
  {
    expression: `typeof new BinarySearchTree().add === 'function'`,
    message: 'The binary search tree has a method called <code>add</code>'
  },
  {
    expression: `
    (() => {
      var test = new BinarySearchTree();
      test.add(4);
      test.add(1);
      test.add(7);
      test.add(87);
      test.add(34);
      test.add(45);
      test.add(73);
      test.add(8);
      return (test.isBinarySearchTree());
    })()
    `,
    message: 'The <code>add</code> method adds elements according to the binary search tree rules'
  },
  {
    expression: `
    (() => {
      var test = new BinarySearchTree();
      test.add(4);
      return test.add(4) === null;
    })()
    `,
    message: 'Adding an element that already exists returns <code>null</code>'
  },
  {
    expression: `typeof new BinarySearchTree().findMin === 'function'`,
    message: 'The binary search tree has a method called <code>findMin</code>'
  },
  {
    expression: `typeof new BinarySearchTree().findMax === 'function'`,
    message: 'The binary search tree has a method called <code>findMax</code>'
  },
  {
    expression:
      `(() => {
        var test = new BinarySearchTree();
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return test.findMin() === 1;
      })()
    `,
    message: 'The <code>findMin</code> method returns the minimum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        var test = new BinarySearchTree();
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return test.findMax() === 87;
      })()
    `,
    message: 'The <code>findMax</code> method returns the maximum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        var test = new BinarySearchTree();
        return (test.findMin() === null && test.findMax() === null)
      })()
    `,
    message: 'The <code>findMin</code> and <code>findMax</code> methods return <code>null</code> for an empty tree'
  },
  {
    expression: `typeof new BinarySearchTree().isPresent === 'function'`,
    message: 'The binary search tree has a method called <code>isPresent</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(4);
        test.add(7);
        test.add(411);
        test.add(452);
        return ( test.isPresent(452) && test.isPresent(411) && test.isPresent(7) && !test.isPresent(100) );
      })()
    `,
    message: 'The <code>isPresent</code> method correctly checks for the presence or absence of elements added to the tree'
  },
  {
    expression: `new BinarySearchTree().isPresent(5) === false`,
    message: '<code>isPresent</code> handles cases where the tree is empty'
  },
  {
    expression: `typeof new BinarySearchTree().findMinHeight === 'function'`,
    message: 'The binary search tree has a method called <code>findMinHeight</code>'
  },
  {
    expression: `typeof new BinarySearchTree().findMaxHeight === 'function'`,
    message: 'The binary search tree has a method called <code>findMaxHeight</code>'
  },
  {
    expression: `typeof new BinarySearchTree().isBalanced === 'function'`,
    message: 'The binary search tree has a method called <code>isBalanced</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return (test.findMinHeight() === 1);
      })()
    `,
    message: 'The <code>findMinHeight</code> method returns the minimum height of the tree'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return (test.findMaxHeight() === 5);
      })()
    `,
    message: 'The <code>findMaxHeight</code> method returns the maximum height of the tree'
  },
  {
    expression: `new BinarySearchTree().findMaxHeight() === -1`,
    message: 'An empty tree returns a height of <code>-1</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(50);
        test.add(17);
        test.add(76);
        test.add(9);
        test.add(23);
        test.add(54);
        test.add(14);
        test.add(19);
        test.add(72);
        test.add(12);
        test.add(67);
        return test.isBalanced();
      })()
    `,
    message: 'The <code>isBalanced</code> method returns true if the tree is a balanced binary search tree'
  },
  {
    expression: "typeof new BinarySearchTree().inOrder === 'function'",
    message: 'The binary search tree has a method called <code>inOrder</code>'
  },
  {
    expression: "typeof new BinarySearchTree().preOrder === 'function'",
    message: 'The binary search tree has a method called <code>preOrder</code>'
  },
  {
    expression: "typeof new BinarySearchTree().postOrder === 'function'",
    message: 'The binary search tree has a method called <code>postOrder</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(7);
        test.add(1);
        test.add(9);
        test.add(0);
        test.add(3);
        test.add(8);
        test.add(10);
        test.add(2);
        test.add(5);
        test.add(4);
        test.add(6);
        return (test.inOrder().join('') === '012345678910');
      })()
    `,
    message: 'The <code>inOrder</code> method returns an array of the node values that result fr an <code>inOrder</code> traversal'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(7);
        test.add(1);
        test.add(9);
        test.add(0);
        test.add(3);
        test.add(8);
        test.add(10);
        test.add(2);
        test.add(5);
        test.add(4);
        test.add(6);
        return (test.preOrder().join('') === '710325469810');
      })()
    `,
    message: 'The <code>preOrder</code> method returns an array of the node values that result from a <code>preOrder</code> traversal'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(7);
        test.add(1);
        test.add(9);
        test.add(0);
        test.add(3);
        test.add(8);
        test.add(10);
        test.add(2);
        test.add(5);
        test.add(4);
        test.add(6);
        return (test.postOrder().join('') === '024653181097');
      })()
    `,
    message: 'The <code>postOrder</code> method returns an array of the node values that result from a <code>postOrder</code> traversal'
  },
  {
    expression: "new BinarySearchTree().inOrder() === null",
    message: 'The <code>inOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: "new BinarySearchTree().preOrder() === null",
    message: 'The <code>preOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: "new BinarySearchTree().postOrder() === null",
    message: 'The <code>postOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: "typeof new BinarySearchTree().levelOrder === 'function'",
    message: 'The binary search tree has a method called <code>levelOrder</code>'
  },
  {
    expression: "typeof new BinarySearchTree().reverseLevelOrder === 'function'",
    message: 'The binary search tree has a method called <code>reverseLevelOrder</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(7);
        test.add(1);
        test.add(9);
        test.add(0);
        test.add(3);
        test.add(8);
        test.add(10);
        test.add(2);
        test.add(5);
        test.add(4);
        test.add(6);
        return (test.levelOrder().join('') === '719038102546');
      })()
    `,
    message: 'The <code>levelOrder</code> method returns an array of the tree node valu explored in level order'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(7);
        test.add(1);
        test.add(9);
        test.add(0);
        test.add(3);
        test.add(8);
        test.add(10);
        test.add(2);
        test.add(5);
        test.add(4);
        test.add(6);
        return (test.reverseLevelOrder().join('') === '791108305264');
      })()
    `,
    message: 'The <code>reverseLevelOrder</code> method returns an array of the tree node values explored in reverse level order'
  },
  {
    expression: 'new BinarySearchTree().levelOrder() === null',
    message: 'The <code>levelOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: 'new BinarySearchTree().reverseLevelOrder() === null',
    message: 'The <code>reverseLevelOrder</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: "typeof new BinarySearchTree().remove === 'function'",
    message: 'The binary search tree has a method called <code>remove</code>'
  },
  {
    expression: "new BinarySearchTree().remove(100) === null",
    message: 'The <code>remove</code> method returns <code>null</code> for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(5);
        test.add(94);
        test.add(3);
        return (test.remove(100) === null);
      })()
    `,
    message: 'Trying to remove an element that does not exist returns <code>null</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(500);
        test.remove(500);
        return (test.inOrder() === null);
      })()
    `,
    message: 'If the root node has no children, deleting it sets the root to <code>null</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(5);
        test.add(3);
        test.add(7);
        test.add(6);
        test.add(10);
        test.add(12);
        test.remove(3);
        test.remove(12);
        test.remove(10);
        return (test.inOrder().join('') === '567');
      })()
    `,
    message: 'The <code>remove</code> method removes leaf nodes from the tree'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(-1);
        test.add(3);
        test.add(7);
        test.add(16);
        test.remove(16);
        test.remove(7);
        test.remove(3);
        return (test.inOrder().join('') === '-1');
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with one child'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(15);
        test.add(27);
        test.remove(15);
        return (test.inOrder().join('') === '27');
      })()
    `,
    message: 'Removing the root in a tree with two nodes sets the second to be the root'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree();
        test.add(1);
        test.add(4);
        test.add(3);
        test.add(7);
        test.add(9);
        test.add(11);
        test.add(14);
        test.add(15);
        test.add(19);
        test.add(50);
        test.remove(9);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(11);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(14);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(19);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(3);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(50);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        test.remove(15);
        if (!test.isBinarySearchTree()) {
          return false;
        };
        return (test.inOrder().join('') === '147');
      })()
    `,
    message: 'The <code>remove</code> method removes nodes with two children while maintaining the binary search tree structure'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree()
        test.add(100);
        test.add(50);
        test.add(300);
        test.remove(100);
        return (test.inOrder().join('') === '50300');
      })()
    `,
    message: 'The root can be removed on a tree of three nodes'
  },
  {
    expression: "typeof new BinarySearchTree().invert === 'function'",
    message: 'The binary search tree has a method called <code>invert</code>'
  },
  {
    expression: `
      (() => {
        var test = new BinarySearchTree()
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        test.invert();
        return test.inOrder().join('') === '877345348741';
      })()
    `,
    message: 'The <code>invert</code> method correctly inverts the tree structure'
  },
  {
    expression: "new BinarySearchTree().invert() === null",
    message: 'Inverting an empty tree returns <code>null</code>'
  },
];
