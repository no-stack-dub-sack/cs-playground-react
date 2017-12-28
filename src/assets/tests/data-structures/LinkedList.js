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
    message: 'The <code>LinkedList</code> class should have a method called <code>add</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      return list.headNode.element === 'cat' && list.headNode.next === null;
    })()`,
    message: 'The <code>add</code> method should assign the first node added (with <code>element</code> and <code>next</code> properties) to the <code>headNode</code> property.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.headNode.next.element === 'dog';
      list.add('bird');
      list.add('pig');
      const test_2 = list.headNode.next.next.next.element === 'pig';
      const test_3 = list.headNode.next.next.next.next === null;
      return test_1 && test_2;
    })()`,
    message: 'Additional elements should be appended to the last element\'s <code>next</code> property, creating a reference between the previous last node <code>node</code> and the newest node created (which as the tail node, should have a <code>next</code> property of <code>null</code>).'
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
    expression: `typeof new LinkedList().head === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>head</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      return JSON.stringify(list.head()) === '{"element":"cat","next":{"element":"dog","next":null}}';
    })()`,
    message: 'The <code>head</code> method should return the <code>headNode</code> property of the <code>LinkedList</code> structure, so that you can easily and visually inspect the list.'
  },
  {
    expression: `typeof new LinkedList().size === 'number' || typeof new LinkedList().size === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>size</code>.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('kitten');
      return typeof list.size === 'number' ? list.size === 3 : list.size() === 3;
    })()`,
    message: 'The <code>size</code> method should return the length of the linked list'
  },
  {
    expression: `typeof new LinkedList().remove === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>remove</code>, which accepts an element to remove as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.remove('cat');
      const test_1 = list.headNode.element === 'dog';
      list.remove('dog');
      const test_2 = list.headNode === null;
      return test_1 && test_2;
    })()`,
    message: 'When the first node in the list is removed, head node should become equal to the removed node\'s <code>next</code> property (either the second node, or <code>null</code> if the list only has one element).'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.remove('dog');
      return list.headNode.next === null;
    })()`,
    message: 'When the last, or tail node of a list is removed, the previous node\'s <code>next</code> property should be set to <code>null</code>'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.remove('dog');
      return list.headNode.next.element === 'bird'
    })()`,
    message: 'When an element that is neither the head or tail node is removed, the linked list structure should be maintained, such that the node previous to the removed node has a <code>next</code> property that references the node that came after the removed node.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.add('pig');
      list.add('cow');
      list.remove('cat');
      const test_1 = list.length === 4;
      list.remove('bird');
      const test_2 = list.length === 3;
      list.remove('cow');
      const test_3 = list.length === 2;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>remove</code> method should decrement the <code>length</code> of the linked list by one for every node removed from the list.'
  },
  {
    expression: `typeof new LinkedList().indexOf === 'function'`,
    message: 'The <code>LinkedList</code> class should have a method called <code>indexOf</code>, which accepts an element to search for as an argument.'
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
    message: 'The <code>indexOf</code> method should return the zero-based index of the given element.'
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
    message: 'The <code>indexOf</code> method should return <code>-1</code> if the given element doesn\'t exist, or if the method is called on an empty list.'
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
    message: 'The <code>elementAt</code> method should return the element at the given index.'
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
      const test_1 = list.removeAt(1) === 'dog' && list.headNode.next.element === 'bird';
      const test_2 = list.removeAt(0) === 'cat' && list.headNode.element === 'bird';
      const test_3 = list.removeAt(1) === 'fish' && list.headNode.next === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>removeAt</code> method should remove and return the element at the given index, while retaining the linked list structure/references.'
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
    message: 'The <code>LinkedList</code> class should have a method called <code>addAt</code>, which accepts a zero-based index and an element to add as arguments.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.add('dog');
      list.addAt(1, 'bird');
      return list.headNode.element === 'cat' && list.headNode.next.element === 'bird' && list.headNode.next.next.element === 'dog';
    })()`,
    message: 'The <code>addAt</code> method should add the given element to the list at the given index, while maintaining the linked-list structure/references.'
  },
  {
    expression: `
    (() => {
      const list = new LinkedList();
      list.add('cat');
      list.addAt(0, 'bird');
      return list.headNode.element === 'bird' && list.headNode.next.element === 'cat' && list.headNode.next.next === null;
    })()`,
    message: 'When the given index is <code>0</code>, the element passed to <code>addAt</code> should become the new head node, referencing the rest of the list in its <code>next</code> property.'
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
