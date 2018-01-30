export default {
  title: 'Max Heap',
  seed:
`class MaxHeap {
    constructor() {
        this.heap = []
    }

    // methods to implement

    // insert(number)
    // remove()
    // sort()
    // print()
    // size()
}
`,
  solution:
`/**
  * @class MaxHeap
  * @property {number[]} heap The heap's collection
  * @method insert {number} node Inserts number according to max heap principle
  * @method remove @returns {number} Returns the max value of the heap
  * @method sort @returns {number[]} returns the sorted heap
  * @method print Prints the heap to the console
  * @method size @returns {number} Returns the size of the heap
  */

class MaxHeap {
    constructor() {
      this.heap = []
    }


    insert(number) {
        this.heap.push(number)

        const swap = (nodeIdx) => {

            const parentIdx = Math.floor((nodeIdx - 1) / 2)
            const parent = this.heap[parentIdx]

            if (parent < number) {
                this.heap[parentIdx] = number
                this.heap[nodeIdx] = parent
                swap(parentIdx)
            }
        }

        if (this.heap.length > 1) {
            return swap(this.heap.length-1)
        }
    }


    remove() {
        if (!this.size) {
            return null
        }

        const max = this.heap.shift()

        if (this.size > 1) {
            this.heap.unshift(this.heap.pop())
        }

        const swap = (node, nodeIdx = 0) => {
            let childIdx
            if (this.size === 2) {
                childIdx = 1
            } else if (this.heap[2 * nodeIdx + 1] > this.heap[2 * nodeIdx + 2]) {
                childIdx = 2 * nodeIdx + 1
            } else {
                childIdx = 2 * nodeIdx + 2
            }

            if (node < this.heap[childIdx]) {
                this.heap[nodeIdx] = this.heap[childIdx]
                this.heap[childIdx] = node
                return swap(node, childIdx)
            }

            return max
        }

        return swap(this.heap[0])
    }


    sort() {
        var sorted = []
        while (this.size) {
            sorted.push(this.remove())
        }
        return sorted.reverse()
    }


    print() {
      console.log(this.heap)
    }


    get size() {
        return this.heap.length
    }
}

const heap = new MaxHeap()

const nums = [7, 10, 14, 32, 2, 64, 37]

for (let num of nums) {
  heap.insert(num)
}

heap.print()
console.log(\`\\nremove \${heap.remove()}\\n\`)
heap.print()
console.log(\`\\nremove \${heap.remove()}\\n\`)
heap.print()
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/heap-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/insert-an-element-into-a-max-heap', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Heap_(data_structure)', caption: 'Wikipedia'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/Heap.html', caption: 'Interactive Animated Visualization!'},
    { href: 'https://visualgo.net/en/heap', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
