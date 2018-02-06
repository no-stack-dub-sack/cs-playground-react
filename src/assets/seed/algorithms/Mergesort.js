export default {
  title: 'Mergesort',
  seed:
`/**
  * @function mergeSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function mergeSort(arr) {
    return arr
}

console.log(mergeSort([27698, 234, 98, 0, 23, 11, 9, 65, 3, 4, 0, 2, 1]))
`,
  solution:
`/**
  * @function mergeSort
  * @param {number[]} arr
  * @returns {number[]}
  */

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }

    var left = arr.slice(0, arr.length/2)
    var right = arr.slice(arr.length/2)

    return merge(mergeSort(left), mergeSort(right))
}

/**
  * @function merge
  * @param {number[]} left
  * @param {number[]} right
  * @returns {number[]}
  */

function merge(left, right) {
    var results = [],
        idxL = 0,
        idxR = 0

    while (idxL < left.length && idxR < right.length) {
        if (left[idxL] <= right[idxR]) {
            results.push(left[idxL++])
        } else {
            results.push(right[idxR++])
        }
    }

    return results.concat(left.slice(idxL), right.slice(idxR))
}

console.log(mergeSort([27698, 234, 98, 0, 23, 11, 9, 65, 3, 4, 0, 2, 1]))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/merge-sort/', caption: 'GeeksforGeeks.org'},
    { href: 'https://www.nczonline.net/blog/2012/10/02/computer-science-and-javascript-merge-sort/', caption: 'NCZOnline Blog (JS Specific)'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-algorithm-questions/implement-merge-sort', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Merge_sort', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/algorithms/sorting-algorithms/merge-sort/', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html', caption: 'Awesome Sorting Algo Visualizations!'},
    { href: 'https://visualgo.net/en/sorting', caption: 'VisualAlgo.net Sorting Algo Visualizations!'},
  ]
}
