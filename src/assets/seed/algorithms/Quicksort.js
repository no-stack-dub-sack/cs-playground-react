export default {
  title: 'Quicksort',
  seed:
`/**
  * @function quickSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function quickSort(arr) {
    return arr
}

console.log(quickSort([6, 9, 23, 3564, 0, 4, 99, 11, 25, 74, 939, 35, 1, 643, 3, 75]))
`,
  solution:
`/**
  * @function quickSort
  * @param {number[]} arr
  * @param {number} [low=0]
  * @param {number} [high=arr.length]
  * @returns {number[]}
  */

function quickSort(arr, low = 0, high = arr.length-1) {

    if (arr.length > 1) {

        var index = partition(arr, low, high)

        if (low < index - 1) {
            quickSort(arr, low, index-1)
        }

        if (high > index) {
            quickSort(arr, index, high)
        }
    }

    return arr
}

/**
  * @function partition
  * @param {number[]} arr
  * @param {number} [low=0]
  * @param {number} [high=arr.length]
  * @returns {number[]}
  */

function partition(arr, low, high) {
    var pivot = arr[Math.floor((low+high)/2)],
        i = low,
        j = high

    while (i <= j) {

        while (arr[i] < pivot) {
            i++
        }

        while (arr[j] > pivot) {
            j--
        }

        if (i <= j) {
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
            j--
            i++
        }

    }

    return i
}

console.log(quickSort([6, 9, 23, 3564, 0, 4, 99, 11, 25, 74, 939, 35, 1, 643, 3, 75]))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/quick-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-algorithm-questions/implement-quick-sort', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Quicksort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/quick-sort', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html', caption: 'Awesome Sorting Algo Visualizations!'},
    { href: 'https://visualgo.net/en/sorting', caption: 'VisualAlgo.net Sorting Algo Visualizations!'},
    { href: 'https://www.youtube.com/watch?v=MZaf_9IZCrc', caption: 'Youtube Quicksort Visualization'},
  ]
}
