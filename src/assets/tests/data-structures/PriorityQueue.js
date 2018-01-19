export const tail = `
if (typeof new PriorityQueue() === 'object') {
  PriorityQueue.prototype.__print__ = function() {
    if (!this.head) {
        return null;
    }

    let result = [];
    let node = this.head;

    while(node) {
      result.push(node.value);
      node = node.next;
    }

    return result.join('');
  }

  PriorityQueue.prototype.__dequeue__ = function() {
    if (!this.head) {
        return null;
    }

    const value = this.head.value;
    this.head = this.head.next;
    this.size--;

    return value;
  }
}

  const checkNodes = (q) => {
    if (typeof q.head.value === 'undefined' ||
        typeof q.head.next === 'undefined') {
      console.log('WARNING: Nodes must have <code>value</code> and <code>next</code> properties for tests to work!');
    }
  }
`;

export const tests = [
  {
    expression: `typeof new PriorityQueue() === 'object'`,
    message: `The <code>PriorityQueue</code> data structure exists`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      return test.head === null && test.size === 0;
    })()`,
    message: `The <code>PriorityQueue</code> data structure has a <code>head</code> property which initializes to a value of <code>null</code>, and a <code>size</code> property which initializes to <code>0</code>`
  },
  {
    expression: `typeof new PriorityQueue().enqueue === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>enqueue</code> which takes an value to enqueue and a priority {number} as arguments`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue(50, 50);
      test.enqueue(4, 4);
      test.enqueue(10, 10);
      test.enqueue(5, 5);
      test.enqueue(2, 2);
      checkNodes(test);
      return test.__print__() === '023451050';
    })()`,
    message: `The <code>enqueue</code> method inserts values into the queue according to priority (lowest priority at the head, greatest priority at the tail)`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue('two', 2);
      test.enqueue(0, 0);
      test.enqueue('two-a', 2);
      test.enqueue(5, 5);
      test.enqueue('two-b', 2);
      return test.__print__() === '0twotwo-atwo-b35';
    })()`,
    message: `When two or more elements have the same priority, the <code>enqueue</code> method should treat the elements inserted first as having higher precedence (will be dequeued first)`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      const one = test.enqueue(null, null) === null;
      const two = test.enqueue(null, '50') === null;
      const three = test.enqueue(null, {}) === null;
      const four = test.enqueue(null, []) === null;
      return one && two && three && four;
    })()`,
    message: `The <code>enqueue</code> method returns <code>null</code> if the second argument is anything except a number`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      if (test.size !== 2) return false;
      test.enqueue(50, 50);
      test.enqueue(50, '50');
      test.enqueue(50, null);
      test.enqueue(4, 4);
      if (test.size !== 4) return false;
      return true;
    })()`,
    message: `The <code>enqueue</code> method should increment the <code>size</code> property by <code>1</code> each time an element is successfully added to the queue`
  },
  {
    expression: `typeof new PriorityQueue().dequeue === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>dequeue</code>`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue(5, 5);
      test.enqueue(4, 4);
      test.enqueue(1, 1);
      test.enqueue(2, 2);
      let result = '';
      let i = 5;
      while (i > 0) {
        result += test.dequeue();
        i--;
      }
      return result === '01234' && test.__print__() === '5';
    })()`,
    message: `The <code>dequeue</code> method removes and returns elements according to their priority (lower priorites take precedence, and are dequeued first)`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue(5, 5);
      let i = 3;
      while (i > 0) {
        test.dequeue();
        i--;
      }
      return test.head === null;
    })()`,
    message: `The <code>dequeue</code> method sets the <code>head</code> property to <code>null</code> when the last element is dequeued`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue(5, 5);
      let i = 3;
      while (i > 0) {
        test.dequeue();
        if (test.size !== i-1) return false;
        i--;
      }
      return true;
    })()`,
    message: `The <code>dequeue</code> decrements the <code>size</code> property by <code>1</code> for every element removed from the queue`
  },
  {
    expression: `typeof new PriorityQueue().front === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>front</code>`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue(5, 5);
      const one = test.front() === 0;
      const two = test.__print__().length === 3;
      test.__dequeue__();
      const three = test.front() === 3;
      const four = test.__print__().length === 2;
      return one && two && three && four;
    })()`,
    message: `The <code>front</code> method returns the element at the front, or top, of the queue, without removing it`
  },
  {
    expression: `typeof new PriorityQueue().isEmpty === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>isEmpty</code>`
  },
  {
    expression: `
    (() => {
      const test = new PriorityQueue();
      const one = test.isEmpty() === true;
      test.enqueue(3, 3);
      const two = test.isEmpty() === false;
      return one && two;
    })()`,
    message: `The <code>isEmpty</code> method returns true is the queue is empty, and false if not`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'contains')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      const one = test.contains('a') === false;
      test.enqueue(0, 0); test.enqueue('0', 6); test.enqueue(2, 2);
      const two = test.contains(2) === true;
      const three = test.contains('0') === true;
      const four = test.contains(9) === false;
      return one && two && three && four;
    })()`,
    message: `The <code>contains</code> method returns <code>true</code> if an element is present in the queue and <code>false</code> if not`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'priorityOf')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue('5', 5);
      return test.priorityOf(3) === 3 && test.priorityOf('5') === 5;
    })()`,
    message: `The <code>priorityOf</code> method returns the priority of a given element`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'priorityOf')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      const one = test.priorityOf(3) === null;
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      return one && test.priorityOf(4) === null;
    })()`,
    message: `The <code>priorityOf</code> method returns <code>null</code> if the given element doesn't exist or if called on an empty queue`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'elementAt')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      test.enqueue(0, 0);
      test.enqueue('5', 5);
      return test.elementAt(3) === 3 && test.elementAt(5) === '5';
    })()`,
    message: `The <code>elementAt</code> method returns the element at a given priority`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'elementAt')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      const one = test.elementAt(2) === null;
      test.enqueue(3, 3);
      return one && test.elementAt(4) === null;
    })()`,
    message: `The <code>elementAt</code> method returns <code>null</code> if the queue is empty or if the given priority does not exist`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'elementAt')) {
        return 'DISABLED';
      }
      const test = new PriorityQueue();
      test.enqueue(3, 3);
      return test.elementAt('3') === null && test.elementAt(true) === null;
    })()`,
    message: `The <code>elementAt</code> method returns <code>null</code> if passed an argument that has a type other than <code>'number'</code>`
  },
]
