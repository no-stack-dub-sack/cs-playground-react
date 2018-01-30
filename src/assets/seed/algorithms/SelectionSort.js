export default {
  title: 'Selection Sort',
  seed:
`/**
  * @function selectionSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function selectionSort(arr) {
    return arr
}

console.log(selectionSort([5, 23, 9876, 21, 0, 11, 2, 67, 89, 234, 0, 12, 43, 694]))
`,
  solution:
`/**
  * @function selectionSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function selectionSort(arr) {
    var pointer = 0
    while (pointer < arr.length) {
        var min = arr[pointer], swapIdx
        for (var i = pointer; i < arr.length; i++) {
            if (arr[i] <= min) {
                min = arr[i]
                swapIdx = i
            }
        }

        var temp = arr[pointer]
        arr[pointer] = min
        arr[swapIdx] = temp
        pointer++
    }

    return arr
}

// NOTE: If your solution looks a little different than this, you can see a couple of other correct but
// slightly modified implementations of selection sort here: https://repl.it/@no_stack_dub_sack/Selection-Sort.

console.log(selectionSort([5, 23, 9876, 21, 0, 11, 2, 67, 89, 234, 0, 12, 43, 694]))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/selection-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2009/09/08/computer-science-in-javascript-selection-sort/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-algorithm-questions/implement-selection-sort', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Selection_sort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/selection-sort/', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html', caption: 'Awesome Sorting Algo Visualizations!'},
    { href: 'https://visualgo.net/en/sorting', caption: 'VisualAlgo.net Sorting Algo Visualizations!'},
  ]
}
