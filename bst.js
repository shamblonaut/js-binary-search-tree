import { Node } from "./node.js";
import { Queue } from "./queue.js";

import { sort } from "@shamblonaut/js-algorithms/mergeSort.js";

export class Tree {
  constructor(array) {
    array = this.#clean(array);
    this.root = this.#buildTree(array);
  }

  #clean(array) {
    array = sort(array);

    let len = array.length;
    for (let i = 0; i < len; i++) {
      if (i < len - 1 && array[i] === array[i + 1]) {
        array.splice(i, 1);
        i--;
        len--;
      }
    }
    return array;
  }

  #buildTree(array) {
    const start = 0;
    const end = array.length - 1;
    if (start > end) return null;

    const middle = Math.floor((end - start) / 2);
    return new Node(
      array[middle],
      this.#buildTree(array.slice(start, middle)),
      this.#buildTree(array.slice(middle + 1, end + 1)),
    );
  }

  insert(...args) {
    if (args.length > 1) {
      args.forEach((value) => this.insert(value));
      return;
    }

    const value = args[0];

    let pointer = this.root;
    while (true) {
      if (value === pointer.data) return;

      const direction = value < pointer.data ? "left" : "right";
      if (pointer[direction] === null) {
        pointer[direction] = new Node(value, null, null);
        break;
      }
      pointer = pointer[direction];
    }
  }

  #deleteNode(node) {
    if (node === this.root && node.right === null) {
      if (node.left === null) this.root = null;
      else this.root = node.left;
    }

    let nextBiggestPointer = node.right;
    while (nextBiggestPointer.left !== null) {
      nextBiggestPointer = nextBiggestPointer.left;
    }
    let nextBiggestNumber = nextBiggestPointer.data;
    this.deleteItem(nextBiggestNumber);
    node.data = nextBiggestNumber;
  }

  deleteItem(...args) {
    if (args.length > 1) {
      let successful = true;
      args.forEach((value) => {
        successful = successful && deleteItem(value);
      });
      return successful;
    }

    const value = args[0];

    let pointer = this.root;
    if (value === pointer.data) this.#deleteNode(pointer);

    while (true) {
      const direction = value < pointer.data ? "left" : "right";
      if (pointer[direction] === null) return false;
      if (value !== pointer[direction].data) {
        pointer = pointer[direction];
        continue;
      }

      // Deleting leaf node
      if (
        pointer[direction].left === null &&
        pointer[direction].right === null
      ) {
        pointer[direction] = null;
        return true;
      }

      // Deleting node with one child
      else if (
        pointer[direction].left === null ||
        pointer[direction].right === null
      ) {
        pointer[direction] =
          pointer[direction].left || pointer[direction].right;
        return true;
      }

      // Deleting node with two children
      else {
        this.#deleteNode(pointer[direction]);
      }
    }
  }

  find(value) {
    let pointer = this.root;
    while (pointer !== null && pointer.data !== value) {
      const direction = value < pointer.data ? "left" : "right";
      pointer = pointer[direction];
    }
    return pointer;
  }

  levelOrderIterate(callback) {
    if (this.root === null) return;

    let pointer = this.root;

    const array = [];
    if (callback) callback(pointer);
    else array.push(pointer.data);

    const queue = new Queue();
    if (pointer.left) queue.push(pointer.left);
    if (pointer.right) queue.push(pointer.right);

    while (!queue.empty()) {
      const node = queue.dequeue();

      if (callback) callback(node);
      else array.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    if (!callback) return array;
  }

  levelOrderRecurse(callback, node = this.root) {
    const queue = new Queue();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    if (node !== this.root) return queue;
    if (this.root === null) return;

    const array = [];
    if (callback) callback(this.root);
    else array.push(this.root.data);

    while (!queue.empty()) {
      node = queue.dequeue();

      if (callback) callback(node);
      else array.push(node.data);

      queue.push(this.levelOrderRecurse(callback, node));
    }
    if (!callback) return array;
  }

  inOrder(callback, node = this.root) {
    if (node === null) return;

    let array = [];
    if (node.left) {
      const leftNode = this.inOrder(callback, node.left);
      if (!callback) array = array.concat(leftNode);
    }

    if (callback) callback(node);
    else array = array.concat(node.data);

    if (node.right) {
      const rightNode = this.inOrder(callback, node.right);
      if (!callback) array = array.concat(rightNode);
    }

    if (!callback) return array;
  }

  preOrder(callback, node = this.root) {
    if (node === null) return;

    let array = [];

    if (callback) callback(node);
    else array = array.concat(node.data);

    if (node.left) {
      const leftNode = this.preOrder(callback, node.left);
      if (!callback) array = array.concat(leftNode);
    }

    if (node.right) {
      const rightNode = this.preOrder(callback, node.right);
      if (!callback) array = array.concat(rightNode);
    }

    if (!callback) return array;
  }

  postOrder(callback, node = this.root) {
    if (node === null) return;

    let array = [];

    if (node.left) {
      const leftNode = this.postOrder(callback, node.left);
      if (!callback) array = array.concat(leftNode);
    }

    if (node.right) {
      const rightNode = this.postOrder(callback, node.right);
      if (!callback) array = array.concat(rightNode);
    }

    if (callback) callback(node);
    else array = array.concat(node.data);

    if (!callback) return array;
  }

  height(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) return null;

    let pointer = this.root;

    let depth = 0;
    while (pointer !== node) {
      if (pointer === null) return null;
      pointer = node.data < pointer.data ? pointer.left : pointer.right;
      depth++;
    }
    return depth;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    return (
      Math.abs(this.height(node.left) - this.height(node.right)) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    this.root = this.#buildTree(this.inOrder());
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
