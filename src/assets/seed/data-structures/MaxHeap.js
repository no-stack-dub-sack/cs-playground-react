export default {
  title: 'Max Heap',
  seed:
`class MaxHeap {
    constructor() {
        this.heap = [];
        this.length = 0;
    }

    // methods to implement

    // insert()
    // remove()
    // print()
    // size()
}
`,
  solution:
`/**
  * @class MaxHeap
  * @property {number[]} heap The heap's collection
  * @property {number} length The heap's length
  * @method insert {number} node Inserts number according to max heap principle
  * @method remove @return {number} Returns the max value of the heap
  * @method print Prints the heap to the console
  * @method size @return {number} Returns the size of the heap
  */

class MaxHeap {
    constructor() {
        this.heap = [];
        this.length = 0;
    }


    insert(node) {
        this.heap.push(node);
        this.length++;

        var swap = (nodeIdx) => {

            var parentIdx = Math.floor((nodeIdx - 1) / 2);
            var parent = this.heap[parentIdx];

            if (parent < node) {
                this.heap[parentIdx] = node;
                this.heap[nodeIdx] = parent;
                swap(parentIdx);
            }
        };

        if (this.length > 1) {
            return swap(this.length-1);
        }
    }


    remove(node = this.heap[0]) {
        if (!this.size) {
            return null;
        }

        var max = this.heap.shift();

        if (this.size > 1) {
            this.heap.unshift(this.heap.pop());
        }

        var swap = (nodeIdx) => {
            var childIdx;
            if (this.size === 2) {
                childIdx = 1;
            } else if (this.heap[2 * nodeIdx + 1] > this.heap[2 * nodeIdx + 2]) {
                childIdx = 2 * nodeIdx + 1;
            } else {
                childIdx = 2 * nodeIdx + 2;
            }

            if (node < this.heap[childIdx]) {
                this.heap[nodeIdx] = this.heap[childIdx];
                this.heap[childIdx] = node;
                return swap(childIdx);
            }

            this.length--;
            return max;

        };

        return swap(0);
    }


    print() {
      console.log(this.heap);
    }


    get size() {
        return this.length;
    }
}

var heap = new MaxHeap();

heap.insert(7);
heap.insert(10);
heap.insert(14);
heap.insert(32);
heap.insert(2);
heap.insert(64);
heap.insert(37);

heap.print();
console.log(\`\\nremove \${heap.remove()}\\n\\n\`);
heap.print();
console.log(\`\\nremove \${heap.remove()}\\n\\n\`);
heap.print();
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/heap-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/insert-an-element-into-a-max-heap', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Heap_(data_structure)', caption: 'Wikipedia'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/Heap.html', caption: 'Interactive Animated Visualization!'},
  ]
};
