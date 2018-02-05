export const tail = `
if (typeof new MaxHeap() === 'object') {
  MaxHeap.prototype.__clear__ = function() {
    this.heap = []
    return true
  }
}

let __heap__
const testHooks = {
  beforeAll: () => {
    __heap__ = new MaxHeap()
  },
  beforeEach: () => {
    __heap__.__clear__()
    typeof __heap__.insert === 'function' &&
      [7,10,14,32,2,64,37].forEach(n => __heap__.insert(n))
  },
  afterAll: () => {
    __heap__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __heap__ === 'object'`,
    message: 'The <code>MaxHeap</code> data structure exists'
  },
  {
    expression: `
      (() => {
        __heap__.__clear__()
        return __heap__.heap && Array.isArray(__heap__.heap) && __heap__.heap.length === 0
      })()`,
    message: 'The <code>MaxHeap</code> data structure has a <code>heap</code> property, initialized as an empty <code>Array</code> object'
  },
  {
    expression: `typeof __heap__.insert == 'function'`,
    message: '<code>MaxHeap</code> has a method called <code>insert</code>: <span class="type">@param {number}</span> <code>number</code>'
  },
  {
    expression: `JSON.stringify(__heap__.heap) === '[64,14,37,7,2,10,32]'`,
    message: 'The <code>insert</code> method adds elements according to the max heap property'
  },
  {
    expression: `typeof __heap__.remove == 'function'`,
    message: '<code>MaxHeap</code> has a method called <code>remove</code>'
  },
  {
    expression: `
      (() => {
        if (__heap__.remove() !== 64) return false
        if (JSON.stringify(__heap__.heap) !== '[37,14,32,7,2,10]')
          return false
        if (__heap__.remove() !== 37) return false
        if (JSON.stringify(__heap__.heap) !== '[32,14,10,7,2]')
          return false
        if (__heap__.remove() !== 32) return false
        if (JSON.stringify(__heap__.heap) !== '[14,2,10,7]')
          return false
        return true
      })()
    `,
    message: 'The <code>remove</code> method removes and returns elements according to the max heap property'
  },
  {
    expression: `__heap__.__clear__() && __heap__.remove() === null`,
    message: 'The <code>remove</code> method returns <code>null</code> when called on an empty heap'
  },
  {
    expression: `typeof __heap__.sort == 'function'`,
    message: '<code>MaxHeap</code> has a method called <code>sort</code>.'
  },
  {
    expression: `JSON.stringify(__heap__.sort()) === '[2,7,10,14,32,37,64]'`,
    message: 'The <code>sort</code> method returns a sorted array (from least to greatest) containing all the elements in the heap'
  },
  {
    expression: `typeof __heap__.size == 'function' || typeof __heap__.size == 'number'`,
    message: '<code>MaxHeap</code> has a method or property called <code>size</code>'
  },
  {
    expression: `
    (() => {
      if (typeof __heap__.size === 'undefined')
        return false
      if (typeof __heap__.size === 'function') {
        if (__heap__.size() !== 7) return false
        __heap__.insert(64)
        __heap__.insert(37)
        if (__heap__.size() !== 9) return false
        __heap__.remove()
        __heap__.remove()
        if (__heap__.size() !== 7) return false
      } else if (typeof __heap__.size === 'number') {
        if (__heap__.size !== 7) return false
        __heap__.insert(64)
        __heap__.insert(37)
        if (__heap__.size !== 9) return false
        __heap__.remove()
        __heap__.remove()
        if (__heap__.size !== 7) return false
      }
      return true
    })()`,
    message: 'The <code>size</code> method returns the correct size of the heap'
  }
]
