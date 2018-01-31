export const tail = `
if (typeof new PriorityQueue() === 'object') {
  PriorityQueue.prototype.__print__ = function() {
    if (!this.head) {
        return null
    }
    let result = []
    let node = this.head
    while(node) {
      result.push(node.value)
      node = node.next
    }
    return result.join('')
  }
  PriorityQueue.prototype.__dequeue__ = function() {
    if (!this.head) {
        return null
    }
    const value = this.head.value
    this.head = this.head.next
    this.size--
    return value
  }
  PriorityQueue.prototype.__clear__ = function() {
    this.head = null
    this.tail = null
    this.size = 0
    this.length = 0
  }
}

const checkNodes = (pq) => {
  if (typeof pq.head.value === 'undefined' ||
      typeof pq.head.next === 'undefined' ||
      typeof pq.head.priority === 'undefined' ) {
    console.log('WARNING: Nodes must have <code>value</code>, <code>next</code> and <code>priority</code> properties for tests to work!')
  }
}

let __pq__
const testHooks = {
  beforeAll: () => {
    __pq__ = new PriorityQueue()
    if (typeof __pq__.head === 'undefined' ||
        typeof __pq__.size === 'undefined' ) {
      console.log(
        'WARNING: Priority Queue must have properties <code>head</code> and <code>size</code> for tests to work!\\n'
      )
    }
  },
  beforeEach: () => {
    __pq__.__clear__()
  },
  afterAll: () => {
    __pq__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __pq__ === 'object'`,
    message: `The <code>PriorityQueue</code> data structure exists`
  },
  {
    expression: `
    (() => {
      return __pq__.head === null && __pq__.size === 0
    })()`,
    message: `The <code>PriorityQueue</code> data structure has a <code>head</code> and <code>size</code> properties which initialize to <code>null</code> and <code>0</code> respectively`
  },
  {
    expression: `typeof __pq__.enqueue === 'function'`,
    message: `The <code>PriorityQueue</code> has an <code>enqueue</code> method: <span class="type">@param {(number|string)}</span> <code>value</code> <span class="type">@param {number}</span> <code>priority</code>`
  },
  {
    expression: `
    (() => {
      const pairs = [[3, 3],[0, 0],[50, 50],[4, 4],[10, 10],[5, 5],[2, 2]]
      for (let [_0_, _1_] of pairs) {
        __pq__.enqueue(_0_, _1_)
      }
      checkNodes(__pq__)
      return __pq__.__print__() === '023451050'
    })()`,
    message: `The <code>enqueue</code> method inserts values into the queue according to priority (lowest priority at the head, greatest priority at the tail)`
  },
  {
    expression: `
    (() => {
      const pairs = [[3, 3],['two', 2],[0, 0],['two-a', 2],[5, 5],['two-b', 2]]
      for (let [_0_, _1_] of pairs) {
        __pq__.enqueue(_0_, _1_)
      }
      return __pq__.__print__() === '0twotwo-atwo-b35'
    })()`,
    message: `When two or more elements have the same priority, the <code>enqueue</code> method treats the elements inserted first as having higher precedence (will be dequeued first)`
  },
  {
    expression: `
    (() => {
      const pairs = [[null, null],[null, '50'],[null, {}],[null, []]]
      for (let [_0_, _1_] of pairs) {
        if (__pq__.enqueue(_0_, _1_) !== null)
          return false
      }
      return true
    })()`,
    message: `The <code>enqueue</code> method returns <code>null</code> if the second argument is anything except a number`
  },
  {
    expression: `
    (() => {
      __pq__.enqueue(3, 3)
      __pq__.enqueue(0, 0)
      if (__pq__.size !== 2) return false
      __pq__.enqueue(50, 50)
      __pq__.enqueue(50, '50')
      __pq__.enqueue(50, null)
      __pq__.enqueue(4, 4)
      if (__pq__.size !== 4) return false
      return true
    })()`,
    message: `The <code>enqueue</code> method increments the <code>size</code> property by <code>1</code> each time an element is successfully added to the queue`
  },
  {
    expression: `typeof __pq__.dequeue === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>dequeue</code>`
  },
  {
    expression: `
    (() => {
      const pairs = [[3, 3],[0, 0],[5, 5],[4, 4],[1, 1],[2, 2]]
      for (let [_0_, _1_] of pairs) {
        __pq__.enqueue(_0_, _1_)
      }
      let result = ''
      let i = 5
      while (i > 0) {
        result += __pq__.dequeue()
        i--
      }
      return result === '01234' && __pq__.__print__() === '5'
    })()`,
    message: `The <code>dequeue</code> method removes and returns elements according to their priority (lower priorites take precedence, and are dequeued first)`
  },
  {
    expression: `
    (() => {
      __pq__.enqueue(3, 3)
      __pq__.enqueue(0, 0)
      __pq__.enqueue(5, 5)
      let i = 3
      while (i > 0) {
        __pq__.dequeue()
        i--
      }
      return __pq__.head === null
    })()`,
    message: `The <code>dequeue</code> method sets the <code>head</code> property to <code>null</code> when the last element is dequeued`
  },
  {
    expression: `
    (() => {
      __pq__.enqueue(3, 3)
      __pq__.enqueue(0, 0)
      __pq__.enqueue(5, 5)
      let i = 3
      while (i > 0) {
        __pq__.dequeue()
        if (__pq__.size !== i-1) return false
        i--
      }
      return true
    })()`,
    message: `The <code>dequeue</code> decrements the <code>size</code> property by <code>1</code> for every element removed from the queue`
  },
  {
    expression: `typeof __pq__.front === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>front</code>`
  },
  {
    expression: `
    (() => {
      __pq__.enqueue(3, 3)
      __pq__.enqueue(0, 0)
      __pq__.enqueue(5, 5)
      const TEST_1 = __pq__.front() === 0
      const TEST_2 = __pq__.__print__().length === 3
      __pq__.__dequeue__()
      const TEST_3 = __pq__.front() === 3
      const TEST_4 = __pq__.__print__().length === 2
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `The <code>front</code> method returns the element at the front, or top, of the queue, without removing it`
  },
  {
    expression: `typeof __pq__.isEmpty === 'function'`,
    message: `The <code>PriorityQueue</code> has a method called <code>isEmpty</code>`
  },
  {
    expression: `
    (() => {
      const TEST_1 = __pq__.isEmpty() === true
      __pq__.enqueue(3, 3)
      const TEST_2 = __pq__.isEmpty() === false
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>isEmpty</code> method returns <code>true</code> is the queue is empty, and <code>false</code> if not`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'contains')) {
        return 'DISABLED'
      }
      if (__pq__.contains('a')) return false
      __pq__.enqueue(0, 0)
      __pq__.enqueue('0', 6)
      __pq__.enqueue(2, 2)
      return __pq__.contains(2) && __pq__.contains('0') && !__pq__.contains(9)
    })()`,
    message: `The <code>contains</code> method returns <code>true</code> if an element is present in the queue and <code>false</code> if not: <span class="type">@param {(number|string)}</span> <code>value</code>`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'priorityOf')) {
        return 'DISABLED'
      }
      const TEST_1 = __pq__.priorityOf(3) === null
      __pq__.enqueue(3, 3)
      __pq__.enqueue(0, 0)
      const TEST_2 = __pq__.priorityOf(4) === null
      __pq__.enqueue('5', 5)
      return TEST_1 && TEST_2 && __pq__.priorityOf(3) === 3 && __pq__.priorityOf('5') === 5
    })()`,
    message: `The <code>priorityOf</code> method returns the priority of a given element or <code>null</code> if the given element doesn't exist: <span class="type">@param {(number|string)}</span> <code>value</code>`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'elementAt')) {
        return 'DISABLED'
      }
      if (__pq__.elementAt(2) !== null) return false
      __pq__.enqueue(3, 3)
      if (__pq__.elementAt(2) !== null) return false
      __pq__.enqueue(0, 0)
      __pq__.enqueue('5', 5)
      if (__pq__.elementAt(3) !== 3) return false
      if (__pq__.elementAt(5) !== '5') return false
      return true
    })()`,
    message: `The <code>elementAt</code> method returns the element at the given priority or <code>null</code> if no such element exists: <span class="type">@param {number}</span> <code>priority</code>`
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(PriorityQueue, 'elementAt')) {
        return 'DISABLED'
      }
      __pq__.enqueue(3, 3)
      return __pq__.elementAt('3') === null && __pq__.elementAt(true) === null
    })()`,
    message: `The <code>elementAt</code> method returns <code>null</code> if passed an argument that has a type other than <code>'number'</code>`
  },
]
