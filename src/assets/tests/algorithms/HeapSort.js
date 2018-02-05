export const tail = `
if (typeof new MinHeap() === 'object') {
  MinHeap.prototype.__clear__ = function() {
    this.heap = []
    return true
  }
}

let __heap__
const testHooks = {
  beforeAll: () => {
    __heap__ = new MinHeap()
  },
  beforeEach: () => {
    __heap__.__clear__()
    typeof __heap__.insert === 'function' &&
       [72,3,19,24,99,45,33,0].forEach(n => __heap__.insert(n))
  },
  afterAll: () => {
    __heap__ = null
  }
}
`

export const tests = [
  {
    expression: `typeof __heap__ === 'object'`,
    message: 'The <code>MinHeap</code> data structure exists'
  },
  {
    expression: `
      (() => {
        __heap__.__clear__()
        return __heap__.heap && Array.isArray(__heap__.heap) && __heap__.heap.length === 0;
      })()`,
    message: 'The <code>MinHeap</code> data structure has a <code>heap</code> property, initialized as an empty array'
  },
  {
    expression: `typeof __heap__.insert == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>insert</code>: <span class="type">@param {number}</span> <code>number</code>'
  },
  {
    expression: `JSON.stringify(__heap__.heap) === '[0,3,19,24,99,45,33,72]'`,
    message: 'The <code>insert</code> method adds elements according to the min heap property'
  },
  {
    expression: `typeof __heap__.remove == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>remove</code>'
  },
  {
    expression: `
      (() => {
        if (__heap__.remove() !== 0) return false
        if (JSON.stringify(__heap__.heap) !== '[3,24,19,72,99,45,33]')
          return false
        if (__heap__.remove() !== 3) return false
        if (JSON.stringify(__heap__.heap) !== '[19,24,33,72,99,45]')
          return false
        if (__heap__.remove() !== 19) return false
        if (JSON.stringify(__heap__.heap) !== '[24,45,33,72,99]')
          return false
        if (__heap__.remove() !== 24) return false
        if (JSON.stringify(__heap__.heap) !== '[33,45,99,72]')
          return false
        return true;
      })()
    `,
    message: 'The <code>remove</code> method removes and returns elements according to the min heap property'
  },
  {
    expression: `__heap__.__clear__() && __heap__.remove() === null`,
    message: 'The <code>remove</code> method returns <code>null</code> when called on an empty heap'
  },
  {
    expression: `typeof __heap__.sort == 'function'`,
    message: '<code>MinHeap</code> has a method called <code>sort</code>'
  },
  {
    expression: `JSON.stringify(__heap__.sort()) === '[0,3,19,24,33,45,72,99]'`,
    message: 'The <code>sort</code> method returns a sorted array (from least to greatest) containing all the elements in the heap'
  }
];
