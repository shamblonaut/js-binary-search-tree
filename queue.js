export class Queue {
  #queue = [];

  push(value) {
    if (!(value instanceof Queue)) return this.#queue.push(value);

    while (!value.empty()) {
      this.#queue.push(value.dequeue());
    }
  }

  dequeue() {
    return this.#queue.shift();
  }

  empty() {
    return this.#queue.length === 0;
  }
}
