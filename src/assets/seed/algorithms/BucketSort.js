export default {
  title: 'Bucket Sort',
  seed:
`/**
  * @function bucketSort
  * @param {number[]} arr
  * @returns {number[]}
  */

// there are many different implementations of this algorithm, this is just one!
// Bucket sort is mainly useful when input is uniformly distributed over a range.
// For exmaple, sorting a large set of floating point numbers which are in range
// from 0.0 to 1.0  and are uniformly distributed across the range. see the link:
// http://www.geeksforgeeks.org/bucket-sort-2/. Note that the solution provided
// here would fail with a set of whole numbers which are not evenly distrubed.

function bucketSort(arr) {
    return arr
}

console.log(
  bucketSort([
    0.77, 0.39, 0.26, 0.33, 0.55, 0.71,
    0.23, 0.88, 0.47, 0.52, 0.72, 0.99,
    0.63, 0.45, 0.21, 0.12, 0.23, 0.94
  ])
)
`,
  solution:
`/**
  * @function bucketSort
  * @param {number[]} arr
  * @returns {number[]}
  */

// there are many different implementations of this algorithm, this is just one!
// Bucket sort is mainly useful when input is uniformly distributed over a range.
// For exmaple, sorting a large set of floating point numbers which are in range
// from 0.0 to 1.0  and are uniformly distributed across the range. see the link:
// http://www.geeksforgeeks.org/bucket-sort-2/. Note that the solution provided
// here would fail with a set of whole numbers which are not evenly distrubed.

function bucketSort(arr) {
    const len = arr.length
    let buckets = [...Array(len)].map(i => Array())

    for (let i = 0; i < arr.length; i++) {
        let bucket = Math.floor(len*arr[i])
        buckets[bucket].push(arr[i])
    }

    for (let bucket of buckets) {
        if (bucket.length) {
            insertionSort(bucket)
        }
    }

    return buckets.reduce((result, el) => result.concat(el), [])
}

/**
  * @function insertionSort
  * @param {number[]} arr
  * @returns {number[]}
  */

// we use insertion sort to sort each bucket.
// also note that this would become much less
// efficent if buckets were too densely distrubed

function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = i+1
        while (arr[j] < arr[j-1]) {
            [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ]
            j--
        }
    }

    return arr
}

console.log(
  bucketSort([
    0.77, 0.39, 0.26, 0.33, 0.55, 0.71,
    0.23, 0.88, 0.47, 0.52, 0.72, 0.99,
    0.63, 0.45, 0.21, 0.12, 0.23, 0.94
  ])
)
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/bucket-sort-2/', caption: 'GeeksforGeeks.org'},
    { href: 'https://en.wikipedia.org/wiki/Bucket_sort', caption: 'Wikipedia'},
    { href: 'https://initjs.org/bucket-sort-in-javascript-dc040b8f0058', caption: 'Another Bucket Sort Implementation'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/BucketSort.html', caption: 'Awesome Bucket Sort Visualizations!'},
  ]
}
