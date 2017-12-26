// LIFO
export const tail = `
  if (
    typeof Stack === 'function' &&
    typeof new Stack() === 'object'
  ) {
    Stack.prototype.printAsStringifiedArray = function() {

      if (!this.root) {
        return '[]';
      }

      const result = [];
      let node = this.root;
      while (node.next) {
        result.push(node.value);
        node = node.next;
      }

      result.push(node.value);

      return JSON.stringify(result);
    }

    Stack.prototype.testPop = function() {
      if (!this.root) {
        return null;
      }

      const value = this.root.value;
      this.root = this.root.next;

      return value;
    }
  }
`;
export const tests = [
  {
    expression: `typeof new Stack() === 'object'`,
    message: 'The <code>Stack</code> data structure exists'
  },
  {
    expression: `new Stack().root === null`,
    message: 'The <code>Stack</code> data structure has a propery called <code>root</code> which initializes to <code>null</code>'
  },
  {
    expression: `typeof new Stack().push === 'function'`,
    message: 'The stack has a method called <code>push</code>'
  },
  // {
  //   expression: `
  //   (() => {
  //     const test = new Stack();
  //     const test.push(5);
  //     const test_1 = test.root.value === 5;
  //     const test.push(4);
  //     const test_2 = test.root.value === 4 && test.root.next.value === 5 && test.root.next.next === null;
  //     return test_1;
  //   })()`,
  //   message: 'As a linked-list representation of a stack, adding an element to the stack with <code>push</code> should creates a new <code>Node</code> with properties <code>value</code> and <code>next</code>, where <code>value</code> is the pushed element and <code>next</code> is <code>null</code> or the next element in the stack'
  // },
  {
    expression: `
    (() => {
      const test = new Stack();
      test.push(5);
      test.push(4);
      test.push(3);
      test.push(2);
      test.push(1);
      return test.printAsStringifiedArray() === '[1,2,3,4,5]'
    })();
    `,
    message: 'The <code>push</code> method adds elements to the top of the stack, according to the first-in-first-out principle'
  },
  {
    expression: `typeof new Stack().pop === 'function'`,
    message: 'The stack has a method called <code>pop</code>'
  },
  {
    expression: `
    (() => {
      const test = new Stack();
      test.push(5);
      test.push(4);
      test.push(3);
      test.push(2);
      test.push(1);
      const beforePop = test.printAsStringifiedArray() === '[1,2,3,4,5]';
      const pop_1 = test.pop();
      const pop_2 = test.pop();
      const pop_3 = test.pop();
      const afterPop = test.printAsStringifiedArray() === '[4,5]';
      return beforePop && pop_1 === 1 && pop_2 === 2 && pop_3 === 3 && afterPop;
    })();
    `,
    message: 'The <code>pop</code> method removes and returns elements from top of the stack, according to the first-in-first-out principle'
  },
  {
    expression: `new Stack().pop() === null`,
    message: 'The <code>pop</code> method returns <code>null</code> when called on an empty stack'
  },
  {
    expression: `typeof new Stack().peek === 'function'`,
    message: 'The stack has a method called <code>peek</code>'
  },
  {
    expression: `
    (() => {
      const test = new Stack();
      test.push(5);
      test.push(4);
      test.push(3);
      test.push(2);
      test.push(1);
      const peek_1 = test.peek();
      const afterPeek_1 = test.printAsStringifiedArray() === '[1,2,3,4,5]';
      test.testPop(); test.testPop();
      const peek_2 = test.peek();
      const afterPeek_2 = test.printAsStringifiedArray() === '[3,4,5]';
      test.push(500);
      const peek_3 = test.peek();
      return peek_1 === 1 && afterPeek_1 && peek_2 === 3 && afterPeek_2 && peek_3 === 500;
    })();
    `,
    message: 'The <code>peek</code> method returns elements from top of the stack, without modifying the stack'
  },
  {
    expression: `new Stack().peek() === null`,
    message: 'The <code>peek</code> method returns <code>null</code> when called on an empty stack'
  },
  {
    expression: `typeof new Stack().isEmpty === 'function'`,
    message: 'The stack has a method called <code>isEmpty</code>'
  },
  {
    expression: `
    (() => {
      const test = new Stack();
      const test_1 = test.isEmpty();
      test.push(5);
      const test_2 = test.isEmpty();
      test.push(4);
      test.push(3);
      test.push(2);
      test.push(1);
      const test_3 = test.isEmpty();
      return test_1 && !test_2 && !test_3;
    })();
    `,
    message: 'The <code>isEmpty</code> method returns <code>true</code> for an empty stack, and <code>false</code> otherwise'
  },
  {
    expression: `typeof new Stack().clear === 'function'`,
    message: 'The stack has a method called <code>clear</code>'
  },
  {
    expression: `
    (() => {
      const test = new Stack();
      test.push(5);
      test.push(4);
      test.push(3);
      test.push(2);
      test.push(1);
      const before = test.printAsStringifiedArray() === '[1,2,3,4,5]';
      test.clear();
      const after = test.root === null;
      return before && after;
    })();
    `,
    message: 'The <code>clear</code> method clears the stack, and resets the stack\'s root to null'
  },
]
