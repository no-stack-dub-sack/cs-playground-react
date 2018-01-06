const head = `
  DoublyLinkedList.prototype.__print() {
    if (this.head == null) {
      return null;
    } else {
      var result = [];
      var node = this.head;
      while (node.next != null) {
        result.push(node.element);
        node = node.next;
      };
      result.push(node.element);
      return result;
    };
  }
  DoublyLinkedList.prototype.__printReverse() {
    if (this.tail == null) {
      return null;
    } else {
      var result = [];
      var node = this.tail;
      while (node.prev != null) {
        result.push(node.element);
        node = node.prev;
      };
      result.push(node.element);
      return result;
    };
  }
`;

export const tests = [
  {
    expression: `typeof new DoublyLinkedList() === 'object'`,
    message: `The DoublyLinkedList data structure exists.`
  },
  {
    expression: ``,
    message: 'The <code>DoublyLinkedList</code> should have <code>head</code>, <code>tail</code> and <code>length</code> properties, which initialize to <code>null</code>, <code>null</code> and <code>0</code>, respectively.'
  },
  {
    expression: `typeof new DoublyLinkedList().add === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class should have a method called <code>add</code>.'
  },
  {
    expression: ``,
    message: `The <code>add</code> method should assign the first node added (with <code>element</code> and <code>next</code> properties) to the <code>head</code> property.`
  },
  {
    expression: ``,
    message: ``
  },
  {
    expression: ``,
    message: ``
  },
  {
    expression: ``,
    message: ``
  },
];
