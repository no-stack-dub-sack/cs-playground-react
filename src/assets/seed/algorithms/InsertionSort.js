export default {
seed:
`/**
  * @function insertionSort
  * @param {number[]} arr
  * @return {number[]}
  */

function insertionSort(arr) {
    return arr;
}

console.log(insertionSort([56, 1, 2, 56, 767, 9, 9732, 0, 99, 11, 34, 87, 234, 1, 54]));
`,
solution:
`/**
  * @function insertionSort
  * @param {number[]} arr
  * @return {number[]}
  */

function insertionSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        var j = i+1;
        while (arr[j] < arr[j-1]) {
            [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ];
            j--;
        }
    }

    return arr;
}

console.log(insertionSort([56, 1, 2, 56, 767, 9, 9732, 0, 99, 11, 34, 87, 234, 1, 54]));
`
};
