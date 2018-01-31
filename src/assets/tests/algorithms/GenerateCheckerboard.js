export const tail = `
  const board_1 = generateCheckerboard(8, 8);
  const board_2 = generateCheckerboard(16, 16);
`;

export const tests = [
  {
    expression: "typeof generateCheckerboard === 'function'",
    message: '<code>generateCheckerboard</code> is a function'
  },
  {
    expression: "typeof board_1 === 'string'",
    message: '<code>generateCheckerboard</code> returns a string'
  },
  {
     expression: "typeof board_1 === 'string' && board_1.match(/#/g).length === 64",
     message: 'an 8x8 board has 64 <code>#</code> chars'
  },
  {
    expression: "typeof board_1 === 'string' && board_1.match(/\\n/g).length === 8",
    message: 'an 8x8 board has 8 <code>\\n</code> chars'
  },
  {
    expression: "typeof board_1 === 'string' && board_1.match(/ /g).length === 64 || board_1.match(/ /g).length === 68",
    message: 'an 8x8 board has 64 or 68 spaces'
  },
  {
    expression: "typeof board_1 === 'string' && board_2.match(/#/g).length === 256",
    message: 'a 16x16 board has 256 <code>#</code> chars'
  },
  {
    expression: "typeof board_1 === 'string' && board_2.match(/\\n/g).length === 16",
    message: 'a 16x16 board has 8 <code>\\n</code> chars'
  },
  {
    expression: "typeof board_1 === 'string' && board_2.match(/ /g).length === 256 || board_2.match(/ /g).length === 264",
    message: 'a 16x16 board has between 256 or 264 spaces'
  },
  {
    expression: `
      (() => {
      let isPassing = true;
      [board_1, board_2].forEach(board => {
        board.split('\\n').forEach((row, i, arr) => {
          if (row) {
            if (i % 2 === 0) {
              isPassing = row[0] === '#';
            } else {
              isPassing = row[0] === ' ';
            }
          }
        });
      });
      return isPassing;
    })()
    `,
    message: 'each even row begins with <code>#</code> and each odd row begins with a space'
  }
];
