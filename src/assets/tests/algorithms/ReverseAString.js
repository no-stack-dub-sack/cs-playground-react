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
  {
    expression: `(() => {
      if (reverseAString('cool') !== 'looc')
        return false
      if (reverseAString('won desrever mi') !== 'im reversed now')
        return false
      if (reverseAString('lsfjlskd sdlfhlsk sldkfslkf') !== 'fklsfkdls kslhflds dksljfsl')
        return false
      if (reverseAString('32 fsdl^%@hs 208fwhn08#$%3b32') !== '23b3%$#80nhwf802 sh@%^ldsf 23')
        return false
      return true
    })()`,
    message: `<code>reverseAString</code> correctly reverses any other string`
  },
]
