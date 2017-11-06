export default
`function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    var left = arr.slice(0, arr.length/2);
    var right = arr.slice(arr.length/2);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var results = [],
        idxL = 0,
        idxR = 0;

    while (idxL < left.length && idxR < right.length) {
        if (left[idxL] <= right[idxR]) {
            results.push(left[idxL++]);
        } else {
            results.push(right[idxR++])
        }
    }

    return results.concat(left.slice(idxL), right.slice(idxR));
}

console.log(mergeSort([27698, 234, 98, 0, 23, 11, 9, 65, 3, 4, 0, 2, 1]));
`;
