export const tail = `
if (
  typeof Queue === 'function' &&
  typeof new Queue() === 'object'
) {
  Queue.prototype.__print = function() {
    if (!this.root) {
        return null;
    }

    let result = [];
    let node = this.root;

    while(node) {
      result.push(node.value);
      node = node.next;
    }

    return result.join('');
  }
}

  const checkNodes = (q) => {
    if (typeof q.root.value === 'undefined' ||
        typeof q.root.next === 'undefined') {
      console.log('WARNING: Nodes must have <code>value</code> and <code>next</code> properties for tests to work!');
    }
  }
`;

export const tests = [
  {
    expression: `typeof new Queue() === 'object'`,
    message: `The <code>Queue</code> data structure exists.`
  },
  {
    expression: `(() => {const test = new Queue();  return test.root === null })()`,
    message: 'The queue has a <code>root</code> property which initializes to <code>null</code>.'
  },
  {
    expression: `typeof new Queue().enqueue === 'function'`,
    message: 'The <code>Queue</code> class should have a <code>enqueue</code> method.'
  },
  {
    expression: `
    (() => {
      const test = new Queue();
      test.enqueue('one');
      test.enqueue('two');
      test.enqueue('three');
      checkNodes(test);
      const qstring = test.__print();
      return /one/.test(qstring) &&
        /two/.test(qstring) &&
        /three/.test(qstring) &&
        qstring.length === 11;
    })()`,
    message: 'The <code>enqueue</code> method should add elements to the queue.'
  },
  {
    expression: `typeof new Queue().dequeue === 'function'`,
    message: 'The <code>Queue</code> class should have a <code>dequeue</code> method.'
  },
  {
    expression: `(() => {
      const test = new Queue();
      test.enqueue('one');
      test.enqueue('two');
      test.enqueue('three');
      const one = test.dequeue() === 'one';
      const two = test.dequeue() === 'two';
      return one && two && test.__print() === 'three';
    })()`,
    message: 'The <code>dequeue</code> method should remove and return the elements from the queue according to the first-in-first-out principle'
  },
  {
    expression: `typeof new Queue().front === 'function'`,
    message: 'The <code>Queue</code> class should have a <code>front</code> method.'
  },
  {
    expression: `
    (() => {
      const test = new Queue();
      test.enqueue('one');
      test.enqueue('two');
      const front = test.front() === 'one';
      const qstring = test.__print();
      return /one/.test(qstring) &&
        /two/.test(qstring) &&
        front;
    })()`,
    message: 'The <code>front</code> method should return value of the front element of the queue, without removing it.'
  },
  {
    expression: `typeof new Queue().size === 'function' || typeof new Queue().size === 'number'`,
    message: 'The <code>Queue</code> class should have a <code>size</code> method.'
  },
  {
    expression: `(() => {
      const test = new Queue();
      const one = typeof test.size === 'function'
        ? test.size() === 0
        : test.size === 0;
      test.enqueue('one');
      test.enqueue('two');
      const two = typeof test.size === 'function'
        ? test.size() === 2
        : test.size === 2;
      test.dequeue();
      const three = typeof test.size === 'function'
        ? test.size() === 1
        : test.size === 1;
      return one && two && three;
    })()`,
    message: 'The <code>size</code> method should always return the correct length of the queue'
  },
  {
    expression: `typeof new Queue().isEmpty === 'function'`,
    message: 'The <code>Queue</code> class should have an <code>isEmpty</code> method.'
  },
  {
    expression: `(() => {
      const test = new Queue();
      const empty = test.isEmpty() === true;
      test.enqueue('one');
      return !test.isEmpty() && empty;
    })()`,
    message: 'The <code>isEmpty</code> method should return <code>true</code> if the queue is empty, and <code>false</code> if not.'
  },
];
