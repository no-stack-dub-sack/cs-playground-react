export const tail = `
  BinarySearchTree.prototype.isBinarySearchTree = function() {
    if (this.root == null) {
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
`
export const tests = [
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        };
        return (typeof test == 'object')
      })()
    `,
    message: 'The BinarySearchTree data structure exists'
  },
  {
    expression: `
    (() => {
      var test = false;
      if (typeof BinarySearchTree !== 'undefined') {
        test = new BinarySearchTree()
      } else {
        return false;
      };
      return (typeof test.add == 'function')
    })()
    `,
    message: 'The binary search tree has a method called add'
  },
  {
    expression: `
    (() => {
      var test = false;
      if (typeof BinarySearchTree !== 'undefined') {
        test = new BinarySearchTree()
      } else {
        return false;
      };
      if (typeof test.add !== 'function') {
        return false;
      };
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
    message: 'The add method adds elements according to the binary search tree rules'
  },
  {
    expression: `
    (() => {
      var test = false;
      if (typeof BinarySearchTree !== 'undefined') {
        test = new BinarySearchTree()
      } else {
        return false;
      };
      if (typeof test.add !== 'function') {
        return false;
      };
      test.add(4);
      return test.add(4) == null;
    })()
    `,
    message: 'Adding an element that already exists returns null'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.findMin == 'function')
      })()
    `,
    message: 'The binary search tree has a method called findMin'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.findMax == 'function')
      })()
    `,
    message: 'The binary search tree has a method called findMax'
  },
  {
    expression:
      `(() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        if (typeof test.findMin !== 'function') {
          return false;
        };
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return test.findMin() == 1;
      })()
    `,
    message: 'The findMin method returns the minimum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        if (typeof test.findMax !== 'function') {
          return false;
        };
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return test.findMax() == 87;
      })()
    `,
    message: 'The findMax method returns the maximum value in the binary search tree'
  },
  {
    expression:
      `(() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        if (typeof test.findMin !== 'function') {
          return false;
        };
        if (typeof test.findMax !== 'function') {
          return false;
        };
        return (test.findMin() == null && test.findMax() == null)
      })()
    `,
    message: 'The findMin and findMax methods return null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.isPresent == 'function')
      })()
    `,
    message: 'The binary search tree has a method called isPresent'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.isPresent !== 'function') {
          return false;
        };
        test.add(4);
        test.add(7);
        test.add(411);
        test.add(452);
        return ( test.isPresent(452) && test.isPresent(411) && test.isPresent(7) && !test.isPresent(100) );
      })()
    `,
    message: 'The isPresent method correctly checks for the presence or absence of elements added to the tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.isPresent !== 'function') {
          return false;
        };
        return test.isPresent(5) == false;
      })()
    `,
    message: 'isPresent handles cases where the tree is empty'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.findMinHeight == 'function')
      })()
    `,
    message: 'The binary search tree has a method called findMinHeight'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.findMaxHeight == 'function')
      })()
    `,
    message: 'The binary search tree has a method called findMaxHeight'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.isBalanced == 'function')
      })()
    `,
    message: 'The binary search tree has a method called isBalanced'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.findMinHeight !== 'function') {
          return false;
        };
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return (test.findMinHeight() == 1);
      })()
    `,
    message: 'The findMinHeight method returns the minimum height of the tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.findMaxHeight !== 'function') {
          return false;
        };
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        return (test.findMaxHeight() == 5);
      })()
    `,
    message: 'The findMaxHeight method returns the maximum height of the tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.findMaxHeight !== 'function') {
          return false;
        };
        return (test.findMaxHeight() == -1);
      })()
    `,
    message: 'An empty tree returns a height of -1'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.isBalanced !== 'function') {
          return false;
        };
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
    message: 'The isBalanced method returns true if the tree is a balanced binary search tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; return (typeof test.inOrder == 'function')
      })()
    `,
    message: 'The binary search tree has a method called inOrder'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; return (typeof test.preOrder == 'function')
      })()
    `,
    message: 'The binary search tree has a method called preOrder'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; return (typeof test.postOrder == 'function')
      })()
    `,
    message: 'The binary search tree has a method called postOrder'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.inOrder !== 'function') {
          return false;
        };
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
        return (test.inOrder().join('') == '012345678910');
      })()
    `,
    message: 'The inOrder method returns an array of the node values that result fr an inOrder traversal'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.preOrder !== 'function') {
          return false;
        };
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
        return (test.preOrder().join('') == '710325469810');
      })()
    `,
    message: 'The preOrder method returns an array of the node values that result from a preOrder traversal'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.postOrder !== 'function') {
          return false;
        };
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
        return (test.postOrder().join('') == '024653181097');
      })()
    `,
    message: 'The postOrder method returns an array of the node values that result from a postOrder traversal'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.inOrder !== 'function') {
          return false;
        }; return (test.inOrder() == null);
      })()
    `,
    message: 'The inOrder method returns null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.preOrder !== 'function') {
          return false;
        }; return (test.preOrder() == null);
      })()
    `,
    message: 'The preOrder method returns null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.postOrder !== 'function') {
          return false;
        }; return (test.postOrder() == null);
      })()
    `,
    message: 'The postOrder method returns null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; return (typeof test.levelOrder == 'function')
      })()
    `,
    message: 'The binary search tree has a method called levelOrder'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; return (typeof test.reverseLevelOrder == 'function')
      })()
    `,
    message: 'The binary search tree has a method called reverseLevelOrder'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.levelOrder !== 'function') {
          return false;
        };
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
        return (test.levelOrder().join('') == '719038102546');
      })()
    `,
    message: 'The levelOrder method returns an array of the tree node valu explored in level order'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.reverseLevelOrder !== 'function') {
          return false;
        };
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
        return (test.reverseLevelOrder().join('') == '791108305264');
      })()
    `,
    message: 'The reverseLevelOrder method returns an array of the tree node values explored in reverse level order'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.levelOrder !== 'function') {
          return false;
        };
        return (test.levelOrder() == null);
      })()
    `,
    message: 'The levelOrder method returns null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.reverseLevelOrder !== 'function') {
          return false;
        }; return (test.reverseLevelOrder() == null);
      })()
    `,
    message: 'The reverseLevelOrder method returns null for an empty tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.remove == 'function')
      })()
    `,
    message: 'The binary search tree has a method called remove'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        }; return (test.remove(100) == null);
      })()
    `,
    message: 'Trying to remove an element that does not exist returns null'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
        test.add(500);
        test.remove(500);
        return (test.inOrder() == null);
      })()
    `,
    message: 'If the root node has no children, deleting it sets the root to null'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
        test.add(5);
        test.add(3);
        test.add(7);
        test.add(6);
        test.add(10);
        test.add(12);
        test.remove(3);
        test.remove(12);
        test.remove(10);
        return (test.inOrder().join('') == '567');
      })()
    `,
    message: 'The remove method removes leaf nodes from the tree'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
        test.add(-1);
        test.add(3);
        test.add(7);
        test.add(16);
        test.remove(16);
        test.remove(7);
        test.remove(3);
        return (test.inOrder().join('') == '-1');
      })()
    `,
    message: 'The remove method removes nodes with one child'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
        test.add(15);
        test.add(27);
        test.remove(15);
        return (test.inOrder().join('') == '27');
      })()
    `,
    message: 'Removing the root in a tree with two nodes sets the second to be the root'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
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
        return (test.inOrder().join('') == '147');
      })()
    `,
    message: 'The remove method removes nodes with two children while maintaining the binary search tree structure'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.remove !== 'function') {
          return false;
        };
        test.add(100);
        test.add(50);
        test.add(300);
        test.remove(100);
        return (test.inOrder().join('') == 50300);
      })()
    `,
    message: 'The root can be removed on a tree of three nodes'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        };
        return (typeof test.invert == 'function')
      })()
    `,
    message: 'The binary search tree has a method called invert'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.invert !== 'function') {
          return false;
        };
        test.add(4);
        test.add(1);
        test.add(7);
        test.add(87);
        test.add(34);
        test.add(45);
        test.add(73);
        test.add(8);
        test.invert();
        return test.inOrder().join('') == '877345348741';
      })()
    `,
    message: 'The invert method correctly inverts the tree structure'
  },
  {
    expression: `
      (() => {
        var test = false;
        if (typeof BinarySearchTree !== 'undefined') {
          test = new BinarySearchTree()
        } else {
          return false;
        }; if (typeof test.invert !== 'function') {
          return false;
        }; return (test.invert() == null);
      })()
    `,
    message: 'Inverting an empty tree returns null'
  },
];
