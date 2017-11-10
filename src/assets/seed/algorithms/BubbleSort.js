export default {
seed:
`/**
  * @function bubbleSort
  * @param {number[]} arr
  * @return {number[]}
  */

function bubbleSort(arr) {
    return arr;
}

console.log(bubbleSort([23, 563, 0, 0, 2, 29, 8, 67, 22, 345, 11, 9, 53, 8]));
`,
solution:
`/**
  * @function bubbleSort
  * @param {number[]} arr
  * @return {number[]}
  */

function bubbleSort(arr) {
  var swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i+1]) {
        [ arr[i], arr[i+1] ] = [ arr[i+1], arr[i] ];
        swapped = true;
      }
    }
  }

  return arr;
}

console.log(bubbleSort([23, 563, 0, 0, 2, 29, 8, 67, 22, 345, 11, 9, 53, 8]));
`
};
