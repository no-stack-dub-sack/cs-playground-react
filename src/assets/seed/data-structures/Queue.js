export default
`class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.root = null;
    }


    enqueue(val, node = this.root) {
        if (!node) {
            this.root = new Node(val);
            return;
        }

        if (node.next) {
            return this.enqueue(val, node.next);
        } else {
            node.next = new Node(val);
        }
    }


    enqueueIterative(val, node = this.root) {
        if (!node) {
            this.root = new Node(val);
            return;
        }

        while (node.next) {
            node = node.next;
        }

        node.next = new Node(val);
    }


    dequeue() {
        if (!this.root) {
            return null;
        }

        const val = this.root.value;
        this.root = this.root.next;

        return val;
    }


    front() {
        if (!this.root) {
            return null;
        }

        return this.root.value;
    }


    isEmpty() {
        if (!this.root) {
            return true;
        }

        return false;
    }


    get size() {
        if (!this.root) {
            return 0;
        }

        let size = 1;
        let node = this.root;
        while (node.next) {
            node = node.next;
            size++;
        }

        return size;
    }
}

const q = new Queue();

console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);

q.enqueue(7);
q.enqueue(10);
q.enqueue(9);
q.enqueue(47);

console.log(JSON.stringify(q, null, 2));

console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);
console.log(\`front: \${q.front()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`front: \${q.front()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
console.log(\`size: \${q.size}\`);
console.log(\`isEmpty: \${q.isEmpty()}\`);
console.log(\`dequeue: \${q.dequeue()}\`);
`;
