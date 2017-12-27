export const tests = [
  {
    expression: `typeof new LinkedList() === 'object'`,
    message: 'The <code>LinkedList</code> data structure exists'
  },
  {
    expression: `new LinkedList().headNode === null && new LinkedList().length === 0`,
    message: 'The <code>LinkedList</code> data structure should have <code>headNode</code> and <code>length</code> properties, which initialize to <code>null</code> and <code>0</code>, respectively'
  },
  {
    expression: `typeof new LinkedList().add === 'function'`,
    message: 'Your <code>LinkedList</code> class should have a <code>add</code> method.'
  },
  {
    expression: `
    (() => {
      var test = new LinkedList();
      test.add('cat');
      return test.headNode.element === 'cat' && test.headNode.next === null;
    })()`,
    message: 'The <code>add</code> method should assign the first node added (with <code>element</code> and <code>next</code> properties) to the <code>headNode</code>.'
  },
  {
    expression: `
    (() => {
      var test = new LinkedList();
      test.add('cat');
      test.add('dog');
      const test_1 = test.headNode.next.element === 'dog';
      test.add('bird');
      test.add('pig');
      const test_2 = test.headNode.next.next.next.element === 'pig';
      const test_3 = test.headNode.next.next.next.next === null;
      return test_1 && test_2;
    })()`,
    message: 'Additional elements should be appended to the last element\'s <code>next</code> property, creating a reference between the previous last node <code>node</code> and the newest node created (which as the tail node, should have a <code>next</code> property of null).'
  },
  // {
  //   expression: `typeof new LinkedList().head === 'function'`,
  //   message: 'Your <code>LinkedList</code> class should have a <code>head</code> method.'
  // },
  {
    expression: `
    (() => {
      var test = new LinkedList();
      test.add('cat');
      test.add('dog');
      const test_1 = test.length;
      test.add('bird');
      test.add('pig');
      const test_2 = test.length === 4;
      return test_1 && test_2;
    })()`,
    message: 'The <code>length</code> property of your <code>LinkedList</code> class should always equal the amount of nodes in the linked list.'
  },
  {
    expression: `typeof new LinkedList().remove === 'function'`,
    message: 'Your <code>LinkedList</code> class should have a <code>remove</code> method.'
  },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.remove('cat');
  //     return test.head().element === 'dog'
  //   })()`,
  //   message: 'Your <code>remove</code> method should reassign <code>head</code> to the second node when the first node is removed.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.remove('cat');
  //     return test.size() === 1
  //   })()`,
  //   message: 'Your <code>remove</code> method should decrease the <code>length</code> of the linked list by one for every node removed.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     test.remove('dog');
  //     return test.head().next.element === 'kitten'
  //   })()`,
  //   message: 'Your <code>remove</code> method should reassign the reference of the previous node of the removed node to the removed node&apos;s <code>next</code> reference.'
  // },
  // {
  //   expression: `typeof new LinkedList().indexOf === 'function'`,
  //   message: 'Your <code>LinkedList</code> class should have a <code>indexOf</code> method.'
  // },
  // {
  //   expression: `typeof new LinkedList().elementAt === 'function'`,
  //   message: 'Your <code>LinkedList</code> class should have a <code>elementAt</code> method.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return test.size() === 3
  //   })()`,
  //   message: 'Your <code>size</code> method should return the length of the linked list'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return test.indexOf('kitten') === 2
  //   })()`,
  //   message: 'Your <code>indexOf</code> method should return the index of the given element.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return test.elementAt(1) === 'dog'
  //   })()`,
  //   message: 'Your <code>elementAt</code> method should return at element at a given index.'
  // },
  // {
  //   expression: `typeof new LinkedList().removeAt === 'function'`,
  //   message: 'Your <code>LinkedList</code> class should have a <code>removeAt</code> method.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     test.removeAt(1);
  //     return test.size() === 2
  //   })()`,
  //   message: 'Your <code>removeAt</code> method should reduce the <code>length</code> of the linked list'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return test.removeAt(1) === 'dog'
  //   })()`,
  //   message: 'Your <code>removeAt</code> method should also return the element of the removed node.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return (test.removeAt(-1) === null)
  //   })()`,
  //   message: 'Your <code>removeAt</code> method should also return <code>null</code> if the given index is less than <code>0</code>'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.add('kitten');
  //     return (test.removeAt(3) === null)
  //   })()`,
  //   message: 'Your <code>removeAt</code> method should also return <code>null</code> if the given index is equal or more than the <code>length</code> of the linked list.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.addAt(0, 'cat');
  //     return test.head().element === 'cat'
  //   })()`,
  //   message: 'Your <code>addAt</code> method should reassign <code>head</code> to the new node when the given index is 0.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     test.addAt(0, 'cat');
  //     return test.size() === 3
  //   })()`,
  //   message: 'Your <code>addAt</code> method should increase the length of the linked list by one for each new node added to the linked list.'
  // },
  // {
  //   expression: `
  //   (() => {
  //     var test = new LinkedList();
  //     test.add('cat');
  //     test.add('dog');
  //     return (test.addAt(4, 'cat') === false);
  //   })()`,
  //   message: 'Your <code>addAt</code> method should return <code>false</code> if a node was unable to be added.'
  // }
];
