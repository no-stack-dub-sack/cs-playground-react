export default {
  title: 'Heap Sort',
  seed:
`class MinHeap {
    constructor() {
        this.heap = []
    }

    // methods to implement:

    // insert(number) <= where the magic happens!
    // remove() <= where the magic happens!
    // print()
    // sort()
    // size()
}

var heap = new MinHeap()

const unsorted = [72,3,19,24,99,45,33,0,2,43,17,19,22,80,100]
// unsorted.forEach(num => heap.insert(num))
// heap.print()
// const sorted = heap.sort()
// console.log('\\nheap sort: ' + JSON.stringify(sorted))
`,
  solution:
`/**
  * @class MinHeap
  * @property {number[]} heap A collection of integers
  * @method insert @param {numnber} node
  * @method remove @returns {?number} returns null or the removed item
  * @method print Logs the heap to the console
  * @method sort @returns {number[]} returns the sorted heap
  * @method size @returns {number} returns the size of the heap
  */

class MinHeap {
    constructor() {
        this.heap = []
    }


    insert(node) {
        this.heap.push(node)

        var swap = (node, nodeIdx) => {

            var parentIdx = Math.floor((nodeIdx - 1) / 2)
            var parent = this.heap[parentIdx]

            if (parent > node) {
                this.heap[parentIdx] = node
                this.heap[nodeIdx] = parent
                swap(node, parentIdx)
            }
        }

        if (this.heap.length > 1) {
            return swap(node, this.heap.length-1)
        }
    }


    remove() {
        if (!this.size) {
            return null
        }

        var min = this.heap.shift()

        if (this.size > 1) {
            this.heap.unshift(this.heap.pop())
        }

        var swap = (node, nodeIdx = 0) => {
            var childIdx
            if (this.size === 2) {
                childIdx = 1
            } else if (this.heap[2 * nodeIdx + 1] < this.heap[2 * nodeIdx + 2]) {
                childIdx = 2 * nodeIdx + 1
            } else {
                childIdx = 2 * nodeIdx + 2
            }

            if (node > this.heap[childIdx]) {
                this.heap[nodeIdx] = this.heap[childIdx]
                this.heap[childIdx] = node
                return swap(node, childIdx)
            }

            return min

        }

        return swap(this.heap[0])
    }


    print() {
      console.log('min heap: ' + JSON.stringify(this.heap))
      console.log('size: ' + this.size)
    }


    sort() {
        var sorted = []

        while (this.size) {
            sorted.push(this.remove())
        }

        return sorted
    }


    get size() {
        return this.heap.length
    }
}

var heap = new MinHeap()

const unsorted = [72,3,19,24,99,45,33,0,2,43,17,19,22,80,100]
unsorted.forEach(num => heap.insert(num))

heap.print()

const sorted = heap.sort()
console.log('\\nheap sort: ' + JSON.stringify(sorted))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/heap-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/implement-heap-sort-with-a-min-heap', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Heapsort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/heap-sort/', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/HeapSort.html', caption: 'Awesome Animated Sorting Algo Visualizations!'},
    { href: 'https://www.hackerearth.com/practice/algorithms/sorting/heap-sort/tutorial/', caption: 'Another cool visualization'},
  ]
}
