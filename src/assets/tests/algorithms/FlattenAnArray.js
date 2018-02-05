export const tests = [
  {
    expression: `typeof steamRoller === 'function'`,
    message: '<code>steamRoller</code> is a function'
  },
  {
    expression: `typeof Array.isArray(steamRoller([1, 2, 3]))`,
    message: '<code>steamRoller</code> returns an array'
  },
  {
    expression: `
    (() => {
      const __nested__ = [1, [2, 3, 4, 5], 2, 3, [4, 5, 6]]
      const result = '[1,2,3,4,5,2,3,4,5,6]'
      return JSON.stringify(steamRoller(__nested_4__)) === result
    })`,
    message: 'The <code>steamRoller</code> function takes a two-dimensional array as an argument and returns a one-dimensional array containing all of the original arrays\' elements'
  },
  {
    expression: `
    (() => {
      const __nested__ = [1, [2, 3, ['1', '2', '3'], true, false], null, 75, [24, 54, 62]]
      const result = '[1,2,3,"1","2","3",true,false,null,75,24,54,62]'
      return JSON.stringify(steamRoller(__nested__)) === result
    })`,
    message: 'The <code>steamRoller</code> function takes a three-dimensional array as an argument and returns a one-dimensional array containing all of the original arrays\' elements'
  },
  {
    expression: `
    (() => {
      const __nested__ = [
        [ 'deep', [ 1, 2, [ 3, 'four', [ [ 'fifty-five', 2020, [ 100, [ [ [ 'whoah' ] ] ] ],
          [ 'ok' ] ] ], { 'really?': 'yes' }, [ [ [ 200, 42 ] ] ], 700, '700' ] ] ], [ [ [
          [ 'deeper' ] ], 'no', null, undefined ] ],
          [ [ [ [ 'deepest-est?', [ [ [ 'nope!' ] ] ] ] ] ]
        ]
      ]
      const result = '["deep",1,2,3,"four","fifty-five",2020,100,"whoah","ok",{"really?":"yes"},200,42,700,"700","deeper","no",null,null,"deepest-est?","nope!"]'
      return JSON.stringify(steamRoller(__nested__)) === result
    })`,
    message: 'The <code>steamRoller</code> function takes a nested array of arbitrary depth and returns a one-dimensional array containing all of the original arrays\' elements'
  }
];
