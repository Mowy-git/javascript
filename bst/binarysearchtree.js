class TNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        let newarray = [...new Set(array)];

        this.root = this.buildTree(newarray);
    }

    buildTree(array) {
        if (array.length === 0) return null;

        let middle = Math.floor((0 + array.length) / 2);
        let node = new TNode(array[middle]);

        node.left = this.buildTree(array.slice(0,middle));
        node.right = this.buildTree(array.slice(middle + 1, array.length));

        return node;
    }

    insert(value) {
        this.insertRecursion(value, this.root);
    }

    insertRecursion(value, node) {
        if (node === null) return new TNode(value);    
        if (value === node.data) return;

        if (value > node.data) {
            node.right = this.insertRecursion(value, node.right);
        } else if (value < node.data) {
            node.left = this.insertRecursion(value, node.left);
        }

        return node;
    }

    deleteItem(value) {
        this.deleteItemRecursion(value, this.root);
    }

    deleteItemRecursion(value, node) {
        if (node === null) return node;

        if (value < node.data) {
            node.left = this.deleteItemRecursion(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItemRecursion(value, node.right);
        } else {

            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.right;
            }

            let succ = this.getSuccessor(node);
            node.data = succ.data;
            node.right = this.deleteItemRecursion(value, succ.right);
        }

        return node;
    }

    getSuccessor(node) {
        let current = node.right;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    find(value) {
        return this.findRecursion(this.root, value);
    }

    findRecursion(node, value) {
        if (node === null) return null;

        if (value > node.data) {
            return this.findRecursion(node.right, value);
        } else if (value < node.data) {
            return this.findRecursion(node.left, value);
        }

        return node;
    }

    levelOrderForEach(callback) {
        if (!typeof callback === "function" || callback === null) {
            throw new Error("Callback is not a function or null");
        }

        let Q = [];
        Q.push(this.root);
        while (Q.length !== 0) {
            let current = Q[0];
            callback(current);

            if (current.left !== null) Q.push(current.left);
            if (current.right !== null) Q.push(current.right);
            Q.shift();
        }
    }

    inOrderForEach(callback) {
        if (!typeof callback === "function" || callback === null) {
            throw new Error("Callback is not a function or null");
        }

        this.inOrderRecursion(this.root, callback);
    }
    
    inOrderRecursion(node, callback) {
        if (node === null) return null;

        if (node.left !== null) {
            this.inOrderRecursion(node.left, callback);
        }

        callback(node);

        if (node.right !== null) {
            this.inOrderRecursion(node.right, callback);
        }
    }

    preOrderForEach(callback) {
        if (!typeof callback === "function" || callback === null) {
            throw new Error("Callback is not a function or null");
        }

        this.preOrderRecursion(this.root, callback);
    }

    preOrderRecursion(node, callback) {
        if (node === null) return null;

        callback(node);

        if (node.left !== null) {
            this.preOrderRecursion(node.left, callback);
        }

        if (node.right !== null) {
            this.preOrderRecursion(node.right, callback);
        }
    }

    postOrderForEach(callback) {
        if (!typeof callback === "function" || callback === null) {
            throw new Error("Callback is not a function or null");
        }

        this.postOrderRecursion(this.root, callback);
    }

    postOrderRecursion(node, callback) {
        if (node === null) return null;

        if (node.left !== null) {
            this.postOrderRecursion(node.left, callback);
        }

        if (node.right !== null) {
            this.postOrderRecursion(node.right, callback);
        }

        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if (node === null) return null;
        return this.heightRecursion(node);
    }

    heightRecursion(node) {
        if (node === null) return -1;
        const leftHeight = this.heightRecursion(node.left);
        const rightHeight = this.heightRecursion(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        return this.depthRecursion(this.root, value, 0);
    }

    depthRecursion(node, value, depth) { 
        if (node === null) return null;

        if (value > node.data) {
            return this.depthRecursion(node.right, value, depth + 1);
        } else if (value < node.data) {
            return this.depthRecursion(node.left, value, depth + 1);
        }

        return depth;
    }
    
    isBalanced(node = this.root) {
        if (node === null) return true;

        let left = this.bHeight(node.left);
        let right = this.bHeight(node.right);

        if (Math.abs(left - right) > 1) {
            return false;
        }
        return this.isBalanced(node.left) && this.isBalanced(node.right); 
    }

    bHeight(node) {
        if (node === null) return 0;
        return Math.max(this.bHeight(node.left), this.bHeight(node.right) + 1);
    }

    rebalance() {
        let array = [];

        this.postOrderForEach(elem => array.push(elem.data));

        this.root = this.buildTree(array);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};



let array = [];
for (let n = 0; n < 10; n++) {
    let random = Math.floor(Math.random() * 100);
    array.push(random);
}

const log = (elem) => console.log(elem);

let tree = new Tree(array);
let pre = tree.preOrderForEach(log);
console.log("---")
let post = tree.postOrderForEach(log);
console.log("---")
let inO = tree.inOrderForEach(log);

for (let n=0;n<5;n++) {
    tree.insert(Math.floor(Math.random() * 100) + 100);
}
