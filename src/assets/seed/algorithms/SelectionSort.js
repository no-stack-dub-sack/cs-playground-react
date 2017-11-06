export default
`function selectionSort(arr) {
    var pointer = 0;
    while (pointer < arr.length) {
        var min = arr[pointer], swapIdx;
        for (var i = pointer; i < arr.length; i++) {
            if (arr[i] <= min) {
                min = arr[i];
                swapIdx = i;
            }
        }

        var temp = arr[pointer];
        arr[pointer] = min;
        arr[swapIdx] = temp;
        pointer++;
    }

    return arr;
}

console.log(selectionSort([5, 23, 9876, 21, 0, 11, 2, 67, 89, 234, 0, 12, 43, 694]));
`;
