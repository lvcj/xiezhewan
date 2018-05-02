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