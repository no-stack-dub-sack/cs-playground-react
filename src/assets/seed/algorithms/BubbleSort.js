export default {
  title: 'Bubble Sort',
  seed:
`/**
  * @function bubbleSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function bubbleSort(arr) {
    return arr
}

console.log(bubbleSort([23, 563, 0, 0, 2, 29, 8, 67, 22, 345, 11, 9, 53, 8]))
`,
  solution:
`/**
  * @function bubbleSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function bubbleSort(arr) {
  var swapped = true

  while (swapped) {
    swapped = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i+1]) {
        [ arr[i], arr[i+1] ] = [ arr[i+1], arr[i] ]
        swapped = true
      }
    }
  }

  return arr
}

console.log(bubbleSort([23, 563, 0, 0, 2, 29, 8, 67, 22, 345, 11, 9, 53, 8]))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/bubble-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2009/05/26/computer-science-in-javascript-bubble-sort/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-algorithm-questions/implement-bubble-sort', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Bubble_sort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/bubble-sort/', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html', caption: 'Awesome Sorting Algo Visualizations!'},
    { href: 'https://visualgo.net/en/sorting', caption: 'VisualAlgo.net Sorting Algo Visualizations!'},
  ]
}
