class Node {
  constructor(id, str) {
    this.id = id;
    this.code = str;
    this.prev = null;
    this.next = null;
  }
}

export default class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(id, str) {
    if (!this.head) {
      this.head = new Node(id, str);
      this.tail = this.head;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = new Node(id, str);
    currentNode.next.prev = currentNode;
    this.tail = currentNode.next;
  }

  makeCircular() {
    this.head.prev = this.tail;
    this.tail.next = this.head;
  }

  fetchNode(id) {
    let currentNode = this.head;

    while (id !== currentNode.id) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}
