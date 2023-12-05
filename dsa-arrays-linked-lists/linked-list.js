/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		if (this.head === null) {
			let new_node = new Node(val);
			this.head = new_node;
			this.tail = new_node;
		} else {
			let new_node = new Node(val);
			new_node.prev = this.tail;
			new_node.next = this.head;
			this.tail.next = new_node;
			this.tail = new_node;
		}
		this.length += 1;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		if (this.head === null) {
			let new_node = new Node(val);
			this.head = new_node;
			this.tail = new_node;
		} else {
			let new_node = new Node(val);
			new_node.next = this.head;
			new_node.prev = this.tail;
			this.head.prev = new_node;
			this.head = new_node;
		}
		this.length += 1;
	}

	/** pop(): return & remove last item. */

	pop() {
		let val = this.tail.val;
		if (this.length === 1) {
			this.tail = null;
			this.head = null;
		} else {
			this.tail = this.tail.prev;
			this.tail.next = this.head;
			this.head.prev = this.tail;
		}
		this.length -= 1;
		return val;
	}

	/** shift(): return & remove first item. */

	shift() {
		let val = this.head.val;
		if (this.length === 1) {
			this.tail = null;
			this.head = null;
		} else {
			this.head = this.head.next;
			this.head.prev = this.tail;
		}
		this.length -= 1;
		return val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		if (idx < 0 || idx > this.length) {
			return null;
		} else {
			let idx_node = this.head;
			for (let i = 0; i < idx; i++) {
				idx_node = idx_node.next;
			}
			return idx_node.val;
		}
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (idx < 0 || idx > this.length) {
			return null;
		} else {
			let idx_node = this.head;
			for (let i = 0; i < idx; i++) {
				idx_node = idx_node.next;
			}
			idx_node.val = val;
		}
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (idx < 0 || idx > this.length) {
		} else if (idx === 0) {
			this.unshift(val);
		} else if (idx === this.length) {
			this.push(val);
		} else {
			let idx_node = this.head;
			for (let i = 0; i < idx - 1; i++) {
				idx_node = idx_node.next;
			}
			let new_node = new Node(val);
			new_node.next = idx_node.next;
			new_node.prev = idx_node;
			idx_node.next = new_node;
			this.length += 1;
		}
		return null;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (idx < 0 || idx > this.length) {
		} else if (idx === 0) {
			this.shift();
		} else if (idx === this.length) {
			this.pop();
		} else {
			let idx_node = this.head;
			for (let i = 0; i < idx - 1; i++) {
				idx_node = idx_node.next;
			}
			idx_node.prev.next = idx_node.next;
			this.length -= 1;
		}
		return null;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) {
			return 0;
		} else {
			let curr_node = this.head;
			let avg = curr_node.val;
			for (let i = 0; i < this.length - 1; i++) {
				curr_node = curr_node.next;
				avg += curr_node.val;
			}
			return avg / this.length;
		}
	}

	/** reverse(): reverse the list */
	reverse() {
		let curr_node = this.head;
		let prev = null;
		for (let i = 0; i < this.length; i++) {
            prev = curr_node.prev;
            
			curr_node.prev = curr_node.next;
            curr_node.next = prev;
            
			curr_node = curr_node.next;
		}
		let temp = this.head;
		this.head = this.tail;
		this.tail = temp;
	}
}

module.exports = LinkedList;
