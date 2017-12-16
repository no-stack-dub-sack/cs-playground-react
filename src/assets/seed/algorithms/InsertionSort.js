export default {
  title: 'Insertion Sort',
  seed:
`/**
  * @function insertionSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function insertionSort(arr) {
    return arr
}

console.log(insertionSort([56, 1, 2, 56, 767, 9, 9732, 0, 99, 11, 34, 87, 234, 1, 54]))
`,
  solution:
`/**
  * @function insertionSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function insertionSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        var j = i+1
        while (arr[j] < arr[j-1]) {
            [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ]
            j--
        }
    }

    return arr
}

console.log(insertionSort([56, 1, 2, 56, 767, 9, 9732, 0, 99, 11, 34, 87, 234, 1, 54]))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/insertion-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2012/09/17/computer-science-in-javascript-insertion-sort/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-algorithm-questions/implement-insertion-sort', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Insertion_sort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/insertion-sort/', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html', caption: 'Awesome Sorting Algo Visualizations!'},
    { href: 'https://visualgo.net/en/sorting', caption: 'VisualAlgo.net Sorting Algo Visualizations!'},
  ]
}
