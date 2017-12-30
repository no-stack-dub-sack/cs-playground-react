export const tests = [
  {
    expression: `typeof new MaxHeap() === 'object'`,
    message: 'The <code>MaxHeap</code> data structure exists.'
  },
  {
    expression: `
      (() => {
        var heap = new MaxHeap();
        return heap.heap && Array.isArray(heap.heap) && heap.heap.length === 0;
      })()`,
    message: 'The <code>MaxHeap</code> data structure has a <code>heap</code> property, initialized as an empty array.'
  },
  {
    expression: `typeof new MaxHeap().insert == 'function'`,
    message: '<code>MaxHeap</code> has a method called <code>insert</code>.'
  },
  {
    expression: `
      (() => {
        var heap = new MaxHeap();
        heap.insert(7);
        heap.insert(10);
        heap.insert(14);
        heap.insert(32);
        heap.insert(2);
        heap.insert(64);
        heap.insert(37);
        return JSON.stringify(heap.heap) === '[64,14,37,7,2,10,32]';
      })()
    `,
    message: 'The <code>insert</code> method adds elements according to the max heap property.'
  },
  {
    expression: `typeof new MaxHeap().remove == 'function'`,
    message: '<code>MaxHeap</code> has a method called <code>remove</code>.'
  },
  {
    expression: `
      (() => {
        var heap = new MaxHeap();
        heap.insert(7);
        heap.insert(10);
        heap.insert(14);
        heap.insert(32);
        heap.insert(2);
        heap.insert(64);
        heap.insert(37);
        var length_1 = heap.heap.length;
        var removed_1 = heap.remove();
        var length_2 = heap.heap.length;
        var removed_2 = heap.remove();
        var length_3 = heap.heap.length;
        var removed_3 = heap.remove();
        return length_1 === 7 && removed_1 === 64 && length_2 === 6 && removed_2 === 32 && length_3 === 5 && removed_3 === 37;
      })()
    `,
    message: 'The <code>remove</code> method removes and returns elements according to the max heap property.'
  },
  {
    expression: `
    (() => {
      const heap = new MaxHeap();
      return heap.remove() === null;
    })()`,
    message: 'The <code>remove</code> method returns <code>null</code> when called on an empty heap.'
  },
  {
    expression: `typeof new MaxHeap().size == 'function' || typeof new MaxHeap().size == 'number'`,
    message: '<code>MaxHeap</code> has a method called <code>size</code>.'
  },
  {
    expression: `
    (() => {
      const heap = new MaxHeap();
      let length_1, length_2, length_3;
      heap.insert(7);
      heap.insert(10);
      heap.insert(14);
      heap.insert(32);
      if (typeof heap.size == 'function') {
        length_1 = heap.size() === 4;
        heap.insert(64);
        heap.insert(37);
        length_2 = heap.size() === 6;
        heap.remove();
        heap.remove();
        length_3 = heap.size() === 4;
      } else if (typeof heap.size == 'number') {
        length_1 = heap.size === 4;
        heap.insert(64);
        heap.insert(37);
        length_2 = heap.size === 6;
        heap.remove();
        heap.remove();
        length_3 = heap.size === 4;
      }
      return length_1 && length_2 && length_3;
    })()`,
    message: 'The <code>size</code> method returns the correct size of the heap.'
  }
];
