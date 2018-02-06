export const tail = `
if (typeof new DoublyLinkedList() === 'object') {
  DoublyLinkedList.prototype.__print__ = function() {
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
  DoublyLinkedList.prototype.__printReverse__ = function() {
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
  DoublyLinkedList.prototype.__clearList__ = function() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  DoublyLinkedList.prototype.__isNodeValid__ = function() {
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
    __list__ = new DoublyLinkedList()
  },
  beforeEach: () => {
    __list__.__clearList__()
  },
  afterAll: () => {
    __list__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __list__ === 'object'`,
    message: 'The <code>DoublyLinkedList</code> data structure exists'
  },
  {
    expression: `__list__.head === null && __list__.tail === null && __list__.length === 0`,
    message: 'The <code>DoublyLinkedList</code> data structure has <code>head</code>, <code>tail</code> and <code>length</code> properties, which initialize to <code>null</code>, <code>null</code> and <code>0</code>, respectively'
  },
  {
    expression: `typeof __list__.add === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class has a method called <code>add</code>: <span class="type">@param {(string|number)}</span> <code>value</code>'
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
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      const TEST_1 = __list__.length
      __list__.add('bird')
      __list__.add('pig')
      const TEST_2 = __list__.length === 4
      return TEST_1 && TEST_2
    })()`,
    message: 'The <code>length</code> property of the <code>DoublyLinkedList</code> class increments every time <code>add</code> is called to reflect the number of nodes in the linked list'
  },
  {
    expression: `typeof __list__.remove === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class has a method called <code>remove</code>: <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.remove('cat')
      const TEST_1 = __list__.head.value === 'dog' && __list__.head.prev === null
      __list__.remove('dog')
      const TEST_2 = __list__.head === null && __list__.tail === null
      return TEST_1 && TEST_2
    })()`,
    message: 'When the first node is removed, <code>head</code> assumes the value of the removed node\'s <code>next</code> value, and if truthy, has a <code>prev</code> value set to <code>null</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('bird')
      __list__.remove('bird')
      const TEST_1 = __list__.tail.value === 'dog' &&
        __list__.tail.prev.value === 'cat' &&
        __list__.tail.next === null
      __list__.remove('dog')
      const TEST_2 = __list__.head.next === null
      __list__.remove('cat')
      return TEST_1 && TEST_2 &&
        __list__.tail === null &&
        __list__.head === null
    })()`,
    message: 'The tail node can be removed, when the list has <em>one or more nodes</em>, and references to previous & next nodes are correctly maintained'
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
      __list__.add('cat')
      __list__.add('bird')
      __list__.add('pig')
      __list__.add('cow')
      const TEST_1 = __list__.remove('cat') && __list__.length === 3
      const TEST_2 = __list__.remove('pig') && __list__.length === 2
      const TEST_3 = __list__.remove('cow') && __list__.length === 1
      const TEST_4 = __list__.remove('bird') && __list__.length === 0
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'For every node removed from the list, the <code>remove</code> method returns a truthy value and decrements the <code>length</code> of the list by one'
  },
  {
    expression: `
    (() => {
      const TEST_1 = __list__.remove('cat') === null
      __list__.add('dog')
      __list__.add('cat')
      const TEST_2 = __list__.remove('bird') === null
      return TEST_1 && TEST_2 && __list__.length === 2
    })()`,
    message: 'If <code>remove</code> is called on an empty list, or finds no matching value to remove, <code>null</code> is returned and the list\'s length property is not mutated'
  },
  {
    expression: `typeof __list__.removeAt === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class has a method called <code>removeAt</code>: <span class="type">@param {number}</span> <code>index</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('bird')
      __list__.add('fish')

      // remove 'dog' at index 1 second node is bird, and bird.prev is cat
      const TEST_1 = __list__.removeAt(1) === 'dog' &&
        __list__.head.next.value === 'bird' &&
        __list__.head.next.prev.value === 'cat'

      // remove 'cat' at head new head is bird, bird.prev is null, second node is fish, fish.prev is bird
      const TEST_2 = __list__.removeAt(0) === 'cat' &&
        __list__.head.value === 'bird' &&
        __list__.head.prev === null &&
        __list__.head.next.value === 'fish' &&
        __list__.head.next.prev.value === 'bird'

      // remove 'fish' at index 1 head is bird, bird.next is null, tail is also now bird, bird.prev is null
      const TEST_3 = __list__.removeAt(1) === 'fish' &&
        __list__.head.next === null &&
        __list__.tail.value === 'bird' &&
        __list__.tail.prev === null

      // remove 'bird' from head/tail (last node), both head and tail are null
      const TEST_4 = __list__.removeAt(0) === 'bird' &&
        __list__.head === null &&
        __list__.tail === null

      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'The <code>removeAt</code> method removes and returns the value at the given index, while retaining the linked list structure/references (consider each of the cases outlined in the <code>list.remove(\'val\')</code> tests above)'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('kitten')
      const TEST_1 = __list__.length === 3
      __list__.removeAt(1)
      const TEST_2 = __list__.length === 2
      __list__.removeAt(1)
      const TEST_3 = __list__.length === 1
      __list__.removeAt(1) // no change
      __list__.removeAt(0)
      const TEST_4 = __list__.length === 0
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'The <code>removeAt</code> method decrements the <code>length</code> of the list by one for every node removed from the list'
  },
  {
    expression: `
    (() => {
      const TEST_1 = __list__.removeAt(0) === null
      __list__.add('cat')
      const TEST_2 = __list__.removeAt(1) === null
      const TEST_3 = __list__.removeAt(5) === null
      const TEST_4 = __list__.removeAt(-5) === null
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'The <code>removeAt</code> method returns <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty'
  },
  {
    expression: `typeof __list__.addAt === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class has a method called <code>addAt</code>: <span class="type">@param {number}</span> <code>index</code> <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.addAt(1, 'bird')
      return __list__.head.value === 'cat' &&
             __list__.head.next.value === 'bird' &&
             __list__.head.next.prev.value === 'cat' &&
             __list__.tail.value === 'dog' &&
             __list__.tail.prev.value === 'bird'
    })()`,
    message: 'The <code>addAt</code> method adds the given value to the list at the given index, while maintaining the linked-list structure/references'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.addAt(0, 'bird')
      return __list__.head.value === 'bird' &&
             __list__.head.prev === null &&
             __list__.tail.value === 'cat' &&
             __list__.tail.prev.value === 'bird' &&
             __list__.tail.next === null
    })()`,
    message: 'When the given index is <code>0</code>, the value passed to <code>addAt</code> becomes the new head node, referencing the rest of the list in its <code>next</code> property'
  },
  {
    expression: `
    (() => {
      const TEST_1 = __list__.addAt(0, 'cat') === null
      __list__.add('cat')
      __list__.add('dog')
      const TEST_2 = __list__.addAt(4, 'cat') === null
      const TEST_3 = __list__.addAt(-4, 'cat') === null
      return TEST_1 && TEST_2 && TEST_3
    })()`,
    message: 'The <code>addAt</code> method returns <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty'
  },
  {
    expression: `
    (() => {
      __list__.add('cat')
      __list__.add('dog')
      __list__.addAt(0, 'bird')
      __list__.addAt(1, 'fish')
      return __list__.length === 4
    })()`,
    message: 'The <code>addAt</code> method increments the <code>length</code> of the linked list by one for each new node added to the list'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'peekHead')) {
        return 'DISABLED'
      }
      __list__.add('cat')
      __list__.add('dog')
      const peek = __list__.peekHead()
      return peek.value === 'cat' && peek.next.value === 'dog'
    })()`,
    message: 'The <code>peekHead</code> method returns the <code>head</code> property of the <code>DoublyLinkedList</code> structure, so that you can easily and visually inspect the list'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'peekTail')) {
        return 'DISABLED'
      }
      __list__.add('cat')
      __list__.add('dog')
      const peek = __list__.peekTail()
      return peek.value === 'dog' && peek.prev.value === 'cat'
    })()`,
    message: 'The <code>peekTail</code> method returns the <code>tail</code> property of the <code>DoublyLinkedList</code> structure, so that you can easily and visually inspect the list'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'indexOf')) {
        return 'DISABLED'
      }
      const TEST_1 = __list__.indexOf('cat') === -1
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('bird')
      const TEST_2 = __list__.indexOf('bird') === 2
      __list__.add('pig')
      __list__.add('cow')
      const TEST_3 = __list__.indexOf('cow') === 4
      __list__.remove('dog')
      const TEST_4 = __list__.indexOf('bird') === 1
      const TEST_5 = __list__.indexOf('monkey') === -1
      return TEST_1 && TEST_2 && TEST_3 && TEST_4 && TEST_5
    })()`,
    message: 'The <code>indexOf</code> method returns the zero-based index of the given element, or <code>-1</code> if it doesn\'t exist: <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'elementAt')) {
        return 'DISABLED'
      }
      __list__.add('cat')
      __list__.add('dog')
      const TEST_1 = __list__.elementAt(1) === 'dog'
      const TEST_2 = __list__.elementAt(0) === 'cat'
      __list__.add('pig')
      __list__.add('bird')
      __list__.add('toad')
      const TEST_3 = __list__.elementAt(3) === 'bird'
      __list__.remove('bird')
      const TEST_4 = __list__.elementAt(3) === 'toad'
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'The <code>elementAt</code> method returns the element at the given index: <span class="type">@param {number}</span> <code>index</code>'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'elementAt')) {
        return 'DISABLED'
      }
      const TEST_1 = __list__.elementAt(0) === null
      __list__.add('cat')
      const TEST_2 = __list__.elementAt(1) === null
      const TEST_3 = __list__.elementAt(5) === null
      const TEST_4 = __list__.elementAt(-5) === null
      return TEST_1 && TEST_2 && TEST_3 && TEST_4
    })()`,
    message: 'The <code>elementAt</code> method returns <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'reverse')) {
        return 'DISABLED'
      }
      __list__.add('cat')
      __list__.add('dog')
      __list__.add('pig')
      __list__.add('bird')
      const reverse = __list__.__printReverse__()
      __list__.reverse()
      return reverse === __list__.__print__()
    })()`,
    message: 'The <code>reverse</code> method reverses the doubly linked list in place'
  },
]
