// 2x树

function BinaryTree() {
    let Node = function(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    let root = null

    let insertNode = function(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }

    this.insert = function(key) { 
        let newNode  = new Node(key)

        if (root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
        return root
    }
}

let nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]

let bTree = new BinaryTree()

nodes.forEach(key => {
    bTree.insert(key)
})

// 前序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    if (root === null) return []
    let load = function (root, res) {
        res.push(root.val)
        if (root.left) load(root.left, res)
        if (root.right) load(root.right, res)
    }
    
    let res = []
    load(root, res)
    return res
};


/**
 * 中序遍历
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    if (root === null) return []
    let load = function (root, res) {
        if(root != null) {
            load(root.left, res)
            res.push(root.val)
            load(root.right, res)
        }
    }
    
    let res = []
    load(root, res)
    return res
};


/**
 * 后序遍历
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    if (root === null) return []
    let load = function (root, res) {
        if(root != null) {
            load(root.left, res)
            load(root.right, res)
            res.push(root.val)
        }
    }
    
    let res = []
    load(root, res)
    return res
};

/**
 * 深度层次遍历
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return []
    let res = []
    let cur_list = []
    cur_list.push(root)
    let next_list = []
    let level = []
    while (cur_list.length !== 0) {
        while (cur_list.length !== 0) {
            let temp = cur_list.shift()
            level.push(temp.val)
            if (temp.left) next_list.push(temp.left)
            if (temp.right) next_list.push(temp.right)
        }
        res.push(level)
        cur_list = next_list;
        next_list = []
        level = []
    }
    return res
};