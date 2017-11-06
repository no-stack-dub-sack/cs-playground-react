export default
`function anagramPalindrome(str) {
    var freq = {}, odds = 0;

    for (var letter of str) {
        freq[letter] = -~freq[letter];
    }

    for (var letter in freq) {
        if (freq[letter] % 2 !== 0) {
            odds++;
            if (odds > 1) {
                return false;
            }
        }
    }

    return true;
}

console.log(anagramPalindrome('armdabbmaboobrd')); // bombard a drab mob
console.log(anagramPalindrome('armdabsbmaboobrd')); // bombards a drab mob
console.log(anagramPalindrome('tdolgsaetagdliadaoasaasinvdeavn')); // a santa dog lived as a devil god at nasa
console.log(anagramPalindrome('raoistddtagstonveakaaeawfewosln')); // a santa dog lived at nasa for two weeks
`;
