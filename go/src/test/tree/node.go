package tree

import "fmt"

type treeNode struct {
	value int
}

func (node *treeNode) Print() {
	fmt.Println(node.value)
}
