export const tail = `
if (typeof new Queue() === 'object') {
  Queue.prototype.__print__ = function() {
    if (!this.root) {
        return null
    }

    let result = []
    let node = this.root

    while(node) {
      result.push(node.value)
      node = node.next
    }

    return result.join('')
  }
  Queue.prototype.__clear__ = function() {
    this.root = null
    this.tail = null
    this.length = 0
  }
}

const checkNodes = (q) => {
  if (typeof q.root.value === 'undefined' ||
  typeof q.root.next === 'undefined') {
    console.log('WARNING: Nodes must have <code>value</code> and <code>next</code> properties for __queue__s to work!')
  }
}

let __queue__
const testHooks = {
  beforeAll: () => {
    __queue__ = new Queue()
  },
  beforeEach: () => {
    __queue__.__clear__()
  },
  afterAll: () => {
    __queue__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __queue__ === 'object'`,
    message: `The <code>Queue</code> data structure exists.`
  },
  {
    expression: `__queue__.root === null`,
    message: 'The queue has a <code>root</code> property which initializes to <code>null</code>'
  },
  {
    expression: `typeof __queue__.enqueue === 'function'`,
    message: 'The <code>Queue</code> class has an <code>enqueue</code> method: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __queue__.enqueue('one')
      __queue__.enqueue('two')
      __queue__.enqueue('three')
      checkNodes(__queue__)
      const qstring = __queue__.__print__()
      return /one/.test(qstring) &&
        /two/.test(qstring) &&
        /three/.test(qstring) &&
        qstring.length === 11
    })()`,
    message: 'The <code>enqueue</code> method adds elements to the queue'
  },
  {
    expression: `typeof __queue__.dequeue === 'function'`,
    message: 'The <code>Queue</code> class has a <code>dequeue</code> method'
  },
  {
    expression: `(() => {
      __queue__.enqueue('one')
      __queue__.enqueue('two')
      __queue__.enqueue('three')
      const TEST_1 = __queue__.dequeue() === 'one'
      const TEST_2 = __queue__.dequeue() === 'two'
      return TEST_1 && TEST_2 && __queue__.__print__() === 'three'
    })()`,
    message: 'The <code>dequeue</code> method removes and returns the elements from the queue according to the first-in-first-out principle'
  },
  {
    expression: `typeof __queue__.front === 'function'`,
    message: 'The <code>Queue</code> class has a <code>front</code> method'
  },
  {
    expression: `
    (() => {
      __queue__.enqueue('one')
      __queue__.enqueue('two')
      const front = __queue__.front() === 'one'
      const qstring = __queue__.__print__()
      return /one/.test(qstring) &&
        /two/.test(qstring) &&
        front
    })()`,
    message: 'The <code>front</code> method returns value of the front element of the queue, without removing it'
  },
  {
    expression: `typeof __queue__.size === 'function' || typeof __queue__.size === 'number'`,
    message: 'The <code>Queue</code> class has a <code>size</code> method'
  },
  {
    expression: `(() => {
      const TEST_1 = typeof __queue__.size === 'function'
        ? __queue__.size() === 0
        : __queue__.size === 0
      __queue__.enqueue('one')
      __queue__.enqueue('two')
      const TEST_2 = typeof __queue__.size === 'function'
        ? __queue__.size() === 2
        : __queue__.size === 2
      __queue__.dequeue()
      const three = typeof __queue__.size === 'function'
        ? __queue__.size() === 1
        : __queue__.size === 1
      return TEST_1 && TEST_2 && three
    })()`,
    message: 'The <code>size</code> method returns the correct length of the queue'
  },
  {
    expression: `typeof __queue__.isEmpty === 'function'`,
    message: 'The <code>Queue</code> class has an <code>isEmpty</code> method'
  },
  {
    expression: `(() => {
      const empty = __queue__.isEmpty() === true
      __queue__.enqueue('one')
      return !__queue__.isEmpty() && empty
    })()`,
    message: 'The <code>isEmpty</code> method returns <code>true</code> if the queue is empty, and <code>false</code> if not'
  },
]
