import { Tree } from "./bst.js";

function generateRandomArray(items, upperLimit) {
  const array = [];
  for (let i = 0; i < items; i++) {
    array.push(Math.floor(Math.random() * upperLimit + 1));
  }
  return array;
}

const t = new Tree(generateRandomArray(16, 100));
console.log("Tree v1");
t.prettyPrint();

console.log(`Is Tree v1 balanced? ${t.isBalanced() ? "Yes" : "No"}`);
console.log();

t.insert(...generateRandomArray(8, 300));
console.log("Tree v2");
t.prettyPrint();

console.log(`Is Tree v2 balanced? ${t.isBalanced() ? "Yes" : "No"}`);
console.log();

t.rebalance();
console.log("Tree v3");
t.prettyPrint();

console.log(`Is Tree v3 balanced? ${t.isBalanced() ? "Yes" : "No"}`);
console.log();

console.log("Level Order:");
console.log(t.levelOrderIterate());

console.log("Pre-Order:");
console.log(t.preOrder());

console.log("In-Order:");
console.log(t.inOrder());

console.log("Post-Order:");
console.log(t.postOrder());
