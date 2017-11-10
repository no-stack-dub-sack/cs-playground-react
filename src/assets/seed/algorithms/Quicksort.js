export default {
seed:
`/**
  * @function quickSort
  * @param {number[]} arr
  * @return {array}
  */

function quickSort(arr) {
    return arr;
}

console.log(quickSort([6, 9, 23, 3564, 0, 4, 99, 11, 25, 74, 939, 35, 1, 643, 3, 75]));
`,
solution:
`/**
  * @function quickSort
  * @param {number[]} arr
  * @return {number[]}
  */

function quickSort(arr, low = 0, high = arr.length-1) {

    if (arr.length > 1) {

        var index = partition(arr, low, high);

        if (low < index - 1) {
            quickSort(arr, low, index-1);
        }

        if (high > index) {
            quickSort(arr, index, high);
        }
    }

    return arr;
}

/**
  * @function bubbleSort
  * @param {number[]} arr
  * @return {number[]}
  */

function partition(arr, low, high) {
    var pivot = arr[Math.floor((low+high)/2)],
        i = low,
        j = high;

    while (i <= j) {

        while (arr[i] < pivot) {
            i++;
        }

        while (arr[j] > pivot) {
            j--;
        }

        if (i <= j) {
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
            j--;
            i++;
        }

    }

    return i;
}

console.log(quickSort([6, 9, 23, 3564, 0, 4, 99, 11, 25, 74, 939, 35, 1, 643, 3, 75]));
`
};
