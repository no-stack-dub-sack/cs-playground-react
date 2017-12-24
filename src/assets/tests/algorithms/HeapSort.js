export const tests = [
  {
    expression: `typeof new MinHeap() === 'object'`,
    message: 'The <code>MinHeap</code> data structure exists.'
  },
  {
    expression: `
      (() => {
        var test = new MinHeap();
        return test.heap && Array.isArray(test.heap) && test.heap.length === 0;
      })()`,
    message: 'The <code>MinHeap</code> data structure has a <code>heap</code> property, initialized as an empty array.'
  },
  {
    expression: `typeof new MinHeap().insert == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>insert</code>.'
  },
  {
    expression: `typeof new MinHeap().remove == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>remove</code>.'
  },
  {
    expression: `typeof new MinHeap().sort == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>sort</code>.'
  },
  {
    expression: `
      (() => {
        var test = new MinHeap();
        test.insert(50);
        test.insert(100);
        test.insert(700);
        test.insert(32);
        test.insert(51);
        return JSON.stringify(test.heap) === '[32,50,700,100,51]';
      })()
    `,
    message: 'The <code>insert</code> method adds elements according to the min heap property.'
  },
  {
    expression: `
      (() => {
        var test = new MinHeap();
        test.insert(50);
        test.insert(100);
        test.insert(700);
        test.insert(32);
        test.insert(51);
        var length_1 = test.heap.length;
        var removed_1 = test.remove();
        var length_2 = test.heap.length;
        var removed_2 = test.remove();
        var length_3 = test.heap.length;
        var removed_3 = test.remove();
        return length_1 === 5 && removed_1 === 32 && length_2 === 4 && removed_2 === 50 && length_3 === 3 && removed_3 === 51;
      })()
    `,
    message: 'The <code>remove</code> method removes elements according to the min heap property.'
  },
  {
    expression: `
      (() => {
        var test = new MinHeap();
        test.insert(50);
        test.insert(100);
        test.insert(700);
        test.insert(32);
        test.insert(51);
        var sorted = test.sort();
        return JSON.stringify(sorted) === '[32,50,51,100,700]';
      })()
    `,
    message: 'The <code>sort</code> method returns a sorted array (from least to greatest) containing all the elements in the heap.'
  }
];
