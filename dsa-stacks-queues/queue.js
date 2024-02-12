/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let newNode = new Node(val);

    if (this.isEmpty()) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }

    this.last = newNode;

    this.size++;

    return;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No node found");
    }
    
    let val = this.first.val;
    this.first = this.first.next;
    this.size--;

    return val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.isEmpty() ? new Error("No node found") : this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;
