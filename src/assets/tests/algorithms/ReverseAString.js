export const tests = [
  {
    expression: `typeof reverseAString === 'function'`,
    message: '<code>reverseAString</code> is a function'
  },
  {
    expression: `reverseAString('I like dogs!') === '!sgod ekil I'`,
    message: '<code>reverseAString("I like dogs!")</code> returns "!sgod ekil I"'
  },
  {
    expression: `reverseAString('Reverse me') === 'em esreveR'`,
    message: '<code>reverseAString("Reverse me")</code> returns "em esreveR"'
  },  
]
