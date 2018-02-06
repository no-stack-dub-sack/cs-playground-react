export default {
  title: 'Generate Checkerboard',
  seed:
`/** @function generateCheckerboard
  * @param {number} h The height of the board
  * @param {number} w The width of the board
  * @returns {string}
  *
  * create an algorithm that takes two ints as
  * arguments, height and width, and returns a
  * string representing a checker board pattern
  * like so (8X8 board):
  *
  *     # # # # # # # #
  *      # # # # # # # #
  *     # # # # # # # #
  *      # # # # # # # #
  *     # # # # # # # #
  *      # # # # # # # #
  *     # # # # # # # #
  *      # # # # # # # #
  *
  * Good luck!
  *
  */

function generateCheckerboard(h, w) {
    return
}

// change the h & w for different size boards!
const h = 8, w = 8

console.log(generateCheckerboard(h, w))
`,
solution:
`/** @function generateCheckerBoard
  * @param {number} h The height of the board
  * @param {number} w The width of the board
  * @returns {string}
  */

function generateCheckerboard(h, w) {
    var row = '', board = ''
    for (let i = 0; i < w; i++) {
        row += "# "
    }

    row += '\\n'

    for (let i = 0; i < h; i++) {
        if (i % 2 === 0) {
            board += row
        } else {
            board += ' ' + row
        }
    }

    return board
}

// change the h & w for different size boards!
const h = 8, w = 8

console.log(generateCheckerboard(h, w))
`,
  resources: [
    { href: 'https://en.wikipedia.org/wiki/Checkerboard#/media/File:Checkerboard_pattern.svg', caption: 'Here\'s what a checkerboard looks like!'},
  ]
}
