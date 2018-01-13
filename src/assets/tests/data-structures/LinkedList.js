export const tail = `
  const checkNodes = (list) => {
    if (typeof list.head.next === 'undefined' ||
        typeof list.head.value === 'undefined') {
      console.log('WARNING: Nodes must have <code>next</code> and <code>value</code> properties for tests to work!');
      return null;
    }
  }
`;
export const tests = [
  {
    expression: `typeof new LinkedList() === 'object'`,
    message: 'The <code>LinkedList</code> data structure exists'
  },
  {
    expression: `(() => { const list = new LinkedList(); return list.head === null && list.size === 0; })`,
    message: 'The <code>LinkedList</code> data structure should have <code>head</code> and <code>length</code> properties, which initialize to <code>null</code> and <code>0</code>, respectively'
  },
  {
    expression: `typeof new LinkedList().add === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>add</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      checkNodes(list);
      return list.head.value === 'cat' && list.head.next === null;
    })()`,
    message: 'The <code>add</code> method should assign the first node added (with <code>value</code> and <code>next</code> properties) to the <code>head</code> property.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.head.next.value === 'dog';
      list.add('bird');
      list.add('pig');
      const test_2 = list.head.next.next.next.value === 'pig';
      const test_3 = list.head.next.next.next.next === null;
      return test_1 && test_2;
    })()`,
    message: 'Additional elements should be appended to the tail node, such that each node keeps track of the next node. The last node should have a <code>next</code> value of <code>null</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.length;
      list.add('bird');
      list.add('pig');
      const test_2 = list.length === 4;
      return test_1 && test_2;
    })()`,
    message: 'The <code>length</code> property of The <code>LinkedList</code> class should increment every time <code>add</code> is called to reflect the number of nodes in the linked list.'
  },
  {
    expression: `typeof new LinkedList().peekHead === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>peekHead</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      return JSON.stringify(list.peekHead()) === '{"value":"cat","next":{"value":"dog","next":null}}';
    })()`,
    message: 'The <code>peekHead</code> method should return the <code>head</code> property of the <code>LinkedList</code> structure, so that you can easily and visually inspect the list.'
  },
  {
    expression: `typeof new LinkedList().remove === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>remove</code>, which accepts a value to remove as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.remove('cat');
      const test_1 = list.head.value === 'dog' && list.head.next.value === 'bird';
      list.remove('dog');
      const test_2 = list.head.value === 'bird' && list.head.next === null;
      list.remove('bird');
      const test_3 = list.head === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'When the first node is removed, <code>head</code> should assume the value of the removed node\'s <code>next</code> value.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.remove('dog');
      return list.head.next === null;
    })()`,
    message: 'When the last, or tail node, of a list is removed, the previous node\'s <code>next</code> property should be set to <code>null</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.remove('dog');
      return list.head.next.value === 'bird';
    })()`,
    message: 'When a node that is neither the head or tail node is removed, the linked list structure and <code>next</code> references should be correctly maintained.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('bird');
      list.add('pig');
      list.add('cow');
      const test_1 = list.remove('cat') && list.length === 3;
      const test_2 = list.remove('pig') && list.length === 2;
      const test_3 = list.remove('cow') && list.length === 1;
      const test_4 = list.remove('bird') && list.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'For every node removed from the list, the <code>remove</code> method should return a truthy value and decrement the <code>length</code> of the list by one.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      const test_1 = list.remove('cat') === null;
      list.add('dog');
      list.add('cat');
      const test_2 = list.remove('bird') === null;
      return test_1 && test_2 && list.length === 2;
    })()`,
    message: 'If <code>remove</code> is called on an empty list, or finds no matching value to remove, <code>null</code> should be returned and the list\'s length property should remain unchanged.'
  },
  {
    expression: `typeof new LinkedList().indexOf === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>indexOf</code>, which accepts a value to search for as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      const test_1 = list.indexOf('bird') === 2;
      list.add('pig');
      list.add('cow');
      const test_2 = list.indexOf('cow') === 4;
      list.remove('dog');
      const test_3 = list.indexOf('bird') === 1;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>indexOf</code> method should return the zero-based index of the given value.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      const test_2 = list.indexOf('dog') === -1;
      list.add('cat');
      const test_1 = list.indexOf('dog') === -1;
      return test_1 && test_2;
    })()`,
    message: 'The <code>indexOf</code> method should return <code>-1</code> if the given value doesn\'t exist, or if the method is called on an empty list.'
  },
  {
    expression: `typeof new LinkedList().elementAt === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>elementAt</code>, which accepts a zero-based index as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.elementAt(1) === 'dog';
      const test_2 = list.elementAt(0) === 'cat';
      list.add('pig');
      list.add('bird');
      list.add('toad');
      const test_3 = list.elementAt(3) === 'bird';
      list.remove('bird');
      const test_4 = list.elementAt(3) === 'toad';
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>elementAt</code> method should return the value at the given index.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      const test_1 = list.elementAt(0) === null;
      list.add('cat');
      const test_2 = list.elementAt(1) === null;
      const test_3 = list.elementAt(5) === null;
      const test_4 = list.elementAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>elementAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
  {
    expression: `typeof new LinkedList().removeAt === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>removeAt</code>, which accepts a zero-based index as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.add('fish');
      const test_1 = list.removeAt(1) === 'dog' && list.head.next.value === 'bird';
      const test_2 = list.removeAt(0) === 'cat' && list.head.value === 'bird' && list.head.next.value === 'fish';
      const test_3 = list.removeAt(1) === 'fish' && list.head.next === null;
      const test_4 = list.removeAt(0) === 'bird' && list.head === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should remove and return the value at the given index, while retaining the linked list structure/references (consider each of the cases outlined in the <code>list.remove(\'val\')</code> tests above).'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('kitten');
      const test_1 = list.length === 3;
      list.removeAt(1);
      const test_2 = list.length === 2;
      list.removeAt(1);
      const test_3 = list.length === 1;
      list.removeAt(1); // no change
      list.removeAt(0);
      const test_4 = list.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should decrement the <code>length</code> of the list by one for every node removed from the list.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      const test_1 = list.removeAt(0) === null;
      list.add('cat');
      const test_2 = list.removeAt(1) === null;
      const test_3 = list.removeAt(5) === null;
      const test_4 = list.removeAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
  {
    expression: `typeof new LinkedList().addAt === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>addAt</code>, which accepts a zero-based index and a value to add as arguments.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.addAt(1, 'bird');
      return list.head.value === 'cat' && list.head.next.value === 'bird' && list.head.next.next.value === 'dog';
    })()`,
    message: 'The <code>addAt</code> method should add the given value to the list at the given index, while maintaining the linked-list structure/references.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.addAt(0, 'bird');
      return list.head.value === 'bird' && list.head.next.value === 'cat' && list.head.next.next === null;
    })()`,
    message: 'When the given index is <code>0</code>, the value passed to <code>addAt</code> should become the new head node, referencing the rest of the list in its <code>next</code> property.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      const test_1 = list.addAt(0, 'cat') === null;
      list.add('cat');
      list.add('dog');
      const test_2 = list.addAt(4, 'cat') === null;
      const test_3 = list.addAt(-4, 'cat') === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>addAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.addAt(0, 'bird');
      list.addAt(1, 'fish');
      return list.length === 4;
    })()`,
    message: 'The <code>addAt</code> method should increment the <code>length</code> of the linked list by one for each new node added to the list.'
  }
];
