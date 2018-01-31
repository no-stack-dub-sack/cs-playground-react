// LIFO
export const tail = `
if (typeof new Stack() === 'object') {
  Stack.prototype.__print__ = function() {
    if (!this.root) {
      return '[]'
    }
    const result = []
    let node = this.root
    while (node.next) {
      result.push(node.value)
      node = node.next
    }
    result.push(node.value)
    return result.join('')
  }
  Stack.prototype.__pop__ = function() {
    if (!this.root) {
      return null
    }
    const value = this.root.value
    this.root = this.root.next
    return value
  }
  Stack.prototype.__clear__ = function() {
    this.root = null
    this.size = 0
  }
}

let __stack__
const testHooks = {
  beforeAll: () => {
    __stack__ = new Stack()
  },
  beforeEach: () => {
    __stack__.__clear__()
  },
  afterAll: () => {
    __stack__ = null
  }
}
`
export const tests = [
  {
    expression: `typeof __stack__ === 'object'`,
    message: 'The <code>Stack</code> data structure exists'
  },
  {
    expression: `__stack__.root === null`,
    message: 'The <code>Stack</code> data structure has a propery called <code>root</code> which initializes to <code>null</code>'
  },
  {
    expression: `typeof __stack__.push === 'function'`,
    message: 'The stack has a method called <code>push</code>: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __stack__.push(5)
      const TEST_1 = __stack__.root.value === 5
      __stack__.push(4)
      const TEST_2 = __stack__.root.value === 4 && __stack__.root.next.value === 5 && __stack__.root.next.next === null
      return TEST_1
    })()`,
    message: `The <code>push</code> creates a new <code>Node</code> with properties <code>value</code> and <code>next</code>, where <code>value</code> is the pushed element and <code>next</code> is <code>null</code> or the next element in the stack`
  },
  {
    expression: `
    (() => {
      [5,4,3,2,1].forEach(n => __stack__.push(n))
      return __stack__.__print__() === '12345'
    })()
    `,
    message: 'The <code>push</code> method adds elements to the top of the stack, according to the first-in-first-out principle'
  },
  {
    expression: `typeof __stack__.pop === 'function'`,
    message: 'The stack has a method called <code>pop</code>'
  },
  {
    expression: `
    (() => {
      [5,4,3,2,1].forEach(n => __stack__.push(n))
      const beforePop = __stack__.__print__() === '12345'
      const pop_1 = __stack__.pop()
      const pop_2 = __stack__.pop()
      const pop_3 = __stack__.pop()
      const afterPop = __stack__.__print__() === '45'
      return beforePop && pop_1 === 1 && pop_2 === 2 && pop_3 === 3 && afterPop
    })()
    `,
    message: 'The <code>pop</code> method removes and returns elements from top of the stack, according to the first-in-first-out principle'
  },
  {
    expression: `__stack__.pop() === null`,
    message: 'The <code>pop</code> method returns <code>null</code> when called on an empty stack'
  },
  {
    expression: `typeof __stack__.peek === 'function'`,
    message: 'The stack has a method called <code>peek</code>'
  },
  {
    expression: `
    (() => {
      [5,4,3,2,1].forEach(n => __stack__.push(n));
      const peek_1 = __stack__.peek()
      const afterPeek_1 = __stack__.__print__() === '12345'
      __stack__.__pop__()
      __stack__.__pop__()
      const peek_2 = __stack__.peek()
      const afterPeek_2 = __stack__.__print__() === '345'
      __stack__.push(500)
      const peek_3 = __stack__.peek()
      return peek_1 === 1 && afterPeek_1 && peek_2 === 3 && afterPeek_2 && peek_3 === 500
    })()
    `,
    message: 'The <code>peek</code> method returns elements from top of the stack, without modifying the stack'
  },
  {
    expression: `__stack__.peek() === null`,
    message: 'The <code>peek</code> method returns <code>null</code> when called on an empty stack'
  },
  {
    expression: `typeof __stack__.isEmpty === 'function'`,
    message: 'The stack has a method called <code>isEmpty</code>'
  },
  {
    expression: `
    (() => {
      const TEST_1 = __stack__.isEmpty()
      __stack__.push(5)
      const TEST_2 = __stack__.isEmpty()
      ;[4,3,2,1].forEach(n => __stack__.push(n))
      const TEST_3 = __stack__.isEmpty()
      return TEST_1 && !TEST_2 && !TEST_3
    })()
    `,
    message: 'The <code>isEmpty</code> method returns <code>true</code> for an empty stack, and <code>false</code> otherwise'
  },
  {
    expression: `typeof __stack__.clear === 'function'`,
    message: 'The stack has a method called <code>clear</code>'
  },
  {
    expression: `
    (() => {
      [5,4,3,2,1].forEach(n => __stack__.push(n))
      const before = __stack__.__print__() === '12345'
      __stack__.clear()
      const after = __stack__.root === null
      return before && after
    })()
    `,
    message: 'The <code>clear</code> method clears the stack, and resets the stack\'s root to null'
  },
]
