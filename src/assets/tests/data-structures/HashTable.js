export const tail = `
if (typeof new HashTable() === 'object') {
  HashTable.prototype.__clearTable = function() {
    this.collection = {};
    return true;
  }
}

const table = new HashTable();
`;

export const tests = [
  {
    expression: `typeof table === 'object'`,
    message: `The HashTable data structure exists`
  },
  {
    expression: `typeof table.add === 'function'`,
    message: `The HashTable class has a method called add`
  },
  {
    expression: ``,
    message: ``
  },
  {
    expression: ``,
    message: ``
  },
]
