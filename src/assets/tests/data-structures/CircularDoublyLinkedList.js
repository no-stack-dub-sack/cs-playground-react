/* NOTE:
 * If any tests are added or removed in this file, tests[14] and test[15],
 * will need to have their index references updated for the changing
 * messages. See note in HashTable.js for more info.
 */

export const tail = `
if (typeof new CircularDoublyLinkedList() === 'object') {
  CircularDoublyLinkedList.prototype.__print__ = function() {
    if (this.head == null) {
      return null
    } else {
      var result = []
      var node = this.head
      while (node.next != null) {
        result.push(node.value)
        node = node.next
      }
      result.push(node.value)
      return result.join('')
    }
  }
  CircularDoublyLinkedList.prototype.__printReverse__ = function() {
    if (this.tail == null) {
      return null
    } else {
      var result = []
      var node = this.tail
      while (node.prev != null) {
        result.push(node.value)
        node = node.prev
      }
      result.push(node.value)
      return result.join('')
    }
  }
  CircularDoublyLinkedList.prototype.__clearList__ = function() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  CircularDoublyLinkedList.prototype.__isNodeValid__ = function() {
    if (typeof this.head.next === 'undefined' ||
        typeof this.head.prev === 'undefined' ||
        typeof this.head.value === 'undefined') {
      console.log('WARNING: Nodes must have <code>next</code>, <code>prev</code> and <code>value</code> properties for tests to work!')
      return null
    }
  }
}

let __list__
const testHooks = {
  beforeAll: () => {
    __list__ = new CircularDoublyLinkedList()
  },
  beforeEach: () => {
    __list__.__clearList__()
  },
  afterEach: () => {
    if (__list__.head) __list__.head.prev = null
    if (__list__.tail) __list__.tail.next = null
    __list__.isCircular = false
  },
  afterAll: () => {
    __list__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __list__ === 'object'`,
    message: 'The <code>CircularDoublyLinkedList</code> data structure exists'
  },
  {
    expression: `__list__.head === null && __list__.tail === null && __list__.isCircular === false &&__list__.length === 0`,
    message: 'The <code>CircularDoublyLinkedList</code> data structure has <code>head</code>, <code>tail</code>, <code>isCircular</code>,  and <code>length</code> properties, which initialize to <code>null</code>, <code>null</code>, <code>false</code>, and <code>0</code>, respectively'
  },
  {
    expression: `typeof __list__.add === 'function'`,
    message: 'The <code>CircularDoublyLinkedList</code> class has a method called <code>add</code>: <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.__isNodeValid__()
      return __list__.head.value === 'cat' && __list__.tail.value === 'cat'
    })()`,
    message: 'The <code>add</code> method assigns the first node added to the <code>head</code> and <code>tail</code> properties'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('bird')
      __list__.add('pig')
      return __list__.__print__() === 'catdogbirdpig' && __list__.__printReverse__() === 'pigbirddogcat' && __list__.tail.next === null && __list__.head.prev === null
    })()`,
    message: 'Additional elements are appended to the list\'s tail, and each node keeps track of both the next and previous nodes'
  },
  {
    expression: `typeof __list__.forgeCircular === 'function'`,
    message: 'The <code>CircularDoublyLinkedList</code> has a <code>forgeCircular</code> method'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('pig')
      const TEST_1 = __list__.head.prev === null
      const TEST_2 = __list__.tail.next === null
      __list__.forgeCircular()
      return TEST_1 &&
             TEST_2 &&
             __list__.head.value === 'cat' &&
             __list__.head.prev.value === 'pig' &&
             __list__.tail.value === 'pig' &&
             __list__.tail.next.value === 'cat'
    })()`,
    message: `When called on a list with at least one node, the <code>forgeCircular</code> method creates circular references between the list's <code>head</code> and <code>tail</code> so that <code>head.prev</code> points to the tail node and <code>tail.next</code> points to the head node`
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('bird')
      __list__.forgeCircular()
      return __list__.isCircular
    })()`,
    message: `When a circular list is successfully forged, the <code>forgeCircular</code> method sets the <code>isCircular</code> property to <code>true</code>`
  },
  {
    expression: `typeof __list__.forgeLinear === 'function'`,
    message: 'The <code>CircularDoublyLinkedList</code> has a <code>forgeLinear</code> method'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('pig')
      __list__.forgeCircular()
      const TEST_1 = __list__.head.prev.value === 'pig'
      const TEST_2 = __list__.tail.next.value === 'cat'
      __list__.forgeLinear()
      const TEST_3 = __list__.head.prev === null
      const TEST_4 = __list__.tail.next === null
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `When <code>forgeCircular</code> has been called, the <code>forgeLinear</code> method resets the circular references so that <code>head.prev</code> and <code>tail.next</code> are both once again set to <code>null</code>`
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('pig')
      __list__.forgeCircular()
      __list__.forgeLinear()
      return !__list__.isCircular
    })()`,
    message: `The <code>forgeLinear</code> method sets the <code>isCircular</code> property to false`
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('bird')
      __list__.forgeCircular()
      __list__.add('cow')
      const TEST_1 = __list__.head.prev.value === 'cow'
      const TEST_2 = __list__.tail.next.value === 'cat'
      __list__.add('fish')
      __list__.add('pig')
      return TEST_1 &&
             TEST_2 &&
             __list__.head.value === 'cat' &&
             __list__.head.prev.value === 'pig' &&
             __list__.tail.value === 'pig' &&
             __list__.tail.next.value === 'cat'
    })()`,
    message: `When additional elements are added to a list after <code>forgeCircular</code> has been called, the list retains the correct circular references between the <code>head</code> and <code>tail</code>`
  },
  {
    expression: `typeof __list__.remove === 'function'`,
    message: 'The <code>CircularDoublyLinkedList</code> class has a method called <code>remove</code>: <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    ((tests) => {
      [1,2,3,4].forEach(n => __list__.add(n))
      __list__.forgeCircular()
      __list__.remove(1)
      if (!__list__.head || !__list__.tail) return false
      const TEST_1 = __list__.head.value === 2 && __list__.head.prev.value === 4
      const TEST_2 = __list__.tail.value === 4 && __list__.tail.next.value === 2
      if (typeof __list__.removeAt === 'function') {
        if (__list__.removeAt(0) !== 2) return false
        if (!__list__.head || !__list__.tail) return false
        if (__list__.head.value !== 3 || __list__.head.prev.value !== 4 ||
            __list__.tail.value !== 4 || __list__.tail.next.value !== 3  ) {
          tests[13].message = '<code>removeAt(0)</code> returns the value of the removed head node, and the list retains the correct circular references between the <code>head</code> and <code>tail</code>'
          return false
        }
      }
      return TEST_1 && TEST_2
    })(tests)`,
    message: `When the head node is removed from a circularly forged list (using <code>remove</code> and <code>removeAt</code>, if defined), the list retains the correct circular references between the <code>head</code> and <code>tail</code>`
  },
  {
    expression: `
    ((tests) => {
      [1,2,3,4].forEach(n => __list__.add(n))
      __list__.forgeCircular()
      __list__.remove(4)
      if (!__list__.head || !__list__.tail) return false
      const TEST_1 = __list__.head.value === 1 && __list__.head.prev.value === 3
      const TEST_2 = __list__.tail.value === 3 && __list__.tail.next.value === 1
      if (typeof __list__.removeAt === 'function') {
        if (__list__.removeAt(2) !== 3) return false
        if (!__list__.head || !__list__.tail) return false
        if (__list__.head.value !== 1 || __list__.head.prev.value !== 2 ||
            __list__.tail.value !== 2 || __list__.tail.next.value !== 1  ) {
          tests[14].message = '<code>removeAt(list.length-1)</code> returns the value of the removed tail node, and the list retains the correct circular references between the <code>head</code> and <code>tail</code>'
          return false
        }
      }
      return TEST_1 && TEST_2
    })(tests)`,
    message: `When the tail node is removed from a circularly forged list (using <code>remove</code> and <code>removeAt</code>, if defined), the list retains the correct circular references between the <code>head</code> and <code>tail</code>`
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('bird')
      __list__.remove('dog')
      return __list__.head.value === 'cat' &&
        __list__.head.next.value === 'bird' &&
        __list__.head.next.prev.value === 'cat'
    })()`,
    message: 'When an element that is neither the head or tail node is removed, the linked list structure, and references to previous & next nodes are maintained'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(CircularDoublyLinkedList, 'addAt')) return false
      return typeof __list__.addAt === 'function'
    })()`,
    message: 'The <code>CircularDoublyLinkedList</code> class has a method called <code>addAt</code>: <span class="type">@param {number}</span> <code>index</code> <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(CircularDoublyLinkedList, 'addAt')) return false
      ;[1,2,3,4].forEach(n => __list__.add(n))
      __list__.forgeCircular()
      __list__.addAt(0, 9)
      if (!__list__.head || !__list__.tail) return false
      const TEST_1 = __list__.head.value === 9 && __list__.head.prev.value === 4
      const TEST_2 = __list__.tail.value === 4 && __list__.tail.next.value === 9
      __list__.addAt(5, 7)
      const TEST_3 = __list__.head.value === 9 && __list__.head.prev.value === 7
      const TEST_4 = __list__.tail.value === 7 && __list__.tail.next.value === 9
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: `When the <code>addAt</code> method is used to add a node to the <code>head</code> or <code>tail</code> of a circularly forged list, the list retains the correct circular references between the <code>head</code> and <code>tail</code>`
  },
  {
    expression: `
    ((tests) => {
      [1,2,3,4,5,6].forEach(n => __list__.add(n))
      const TEST_1 = __list__.length === 6
      __list__.remove(3)
      const TEST_2 = __list__.length === 5
      if (typeof __list__.removeAt === 'function') {
        __list__.removeAt(3)
        if (__list__.length !== 4) {
          tests[19].message = 'The <code>removeAt</code> method correctly decrements the length of the list'
          return false
        }
      }
      if (typeof __list__.addAt === 'function') {
        __list__.addAt(3, 'five')
        if (__list__.length !== 5) {
          tests[18].message = 'The <code>addAt</code> method correctly increments the length of the list'
          return false
        }
      }
      return TEST_1 && TEST_2
    })(tests)`,
    message: `The <code>length</code> property correctly tracks the length of the list when nodes are added or removed`
  },
  {
    expression: `typeof __list__.reverse === 'function'`,
    message: 'The <code>CircularDoublyLinkedList</code> class has a method called <code>reverse</code>'
  },
  {
    expression: `
    (() => {
      [1,2,3,4].forEach(n => __list__.add(n))
      __list__.forgeCircular()
      __list__.reverse()
      const TEST_1 = __list__.head.prev.value === 1
      const TEST_2 = __list__.tail.next.value === 4
      __list__.head.prev = null
      __list__.tail.next = null
      return TEST_1 &&
             TEST_2 &&
             __list__.__print__() === '4321' &&
             __list__.__printReverse__() === '1234'
    })()`,
    message: `The <code>reverse</code> method correctly reverses the nodes of a circularly forged list, in place`
  }
]
