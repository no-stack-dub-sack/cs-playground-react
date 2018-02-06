export default {
  title: 'Flatten An Array',
  seed:
`/**
  * @function steamRoller
  * @param {*[]} arr An multi-dimensional array of arbitrary depth
  * @return {*[]}
  */

// There are so many ways to flatten an array! Flattening a 2d array is super easy, but
// in this algorithm, make sure you can account for flattening arrays of any arbitrary
// depth: 3d, 5d, 10d, 55d! Ok, let's not get carried away, but you get the point. Use
// this array as a test case. Once flat, this array should contain all of it's original
// values, in their original order, but all in a single one-dimensional array. Since this
// this challenge is pretty easy, see how many different ways you can come up with to
// solve this before looking at the solution, and see how short and effecient you can
// make your own solution! One-liner anyone? :-) Good luck!

const steamRoller = (arr) => {
  return arr;
}

// looks crazy, is valid:
let superNestedArray = [
  [ 'deep', [ 1, 2, [ 3, 'four', [ [ 'fifty-five', 2020, [ 100, [ [ [ 'whoah' ] ] ] ],
    [ 'ok' ] ] ], { 'really?': 'yes' }, [ [ [ 200, 42 ] ] ], 700, '700' ] ] ], [ [ [
    [ 'deeper' ] ], 'no', null, undefined ] ],
    [ [ [ [ 'deepest-est?', [ [ [ 'nope!' ] ] ] ] ] ]
  ]
];

console.log(steamRoller(superNestedArray));

// should return:
// [ 'deep', 1, 2, 3, 'four', 'fifty-five', 2020, 100, 'whoah', 'ok', { 'really?': 'yes' }, 200, 42, 700, '700', 'deeper', 'no', null, undefined, 'deepest-est?', 'nope!' ]
`,
  solution:
`/**
  * @function steamRoller
  * @param {*[]} arr An multi-dimensional array of arbitrary depth
  * @return {*[]}
  */

const steamRoller = (arr) => {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? steamRoller(flat) : flat;
}

// looks crazy, is valid:
let superNestedArray = [
  [ 'deep', [ 1, 2, [ 3, 'four', [ [ 'fifty-five', 2020, [ 100, [ [ [ 'whoah' ] ] ] ],
    [ 'ok' ] ] ], { 'really?': 'yes' }, [ [ [ 200, 42 ] ] ], 700, '700' ] ] ], [ [ [
    [ 'deeper' ] ], 'no', null, undefined ] ],
    [ [ [ [ 'deepest-est?', [ [ [ 'nope!' ] ] ] ] ] ]
  ]
];

console.log(steamRoller(superNestedArray));
`,
  resources: [
    { href: 'https://www.codetuts.tech/flatten-deep-nested-array-object/', caption: 'Cool article on flattening techniques' },
    { href: 'http://blog.benoitvallon.com/tips/flattening-arrays-in-javascript/', caption: 'Ben\'s Blog: Recursive and Iterative Approaches' }
  ]
};
