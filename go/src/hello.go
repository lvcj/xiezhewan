package main

import "fmt"

var a = 5.0

func variable() {
	a := 5.0
	var s string
	c := int(a)
	fmt.Println(c)
	fmt.Printf(s)
}
func types() {
	aVar := 10
	fmt.Println(aVar == 5)
}
func variableValue() {
	var a, b int = 3, 4
	var s string = "abc"

	fmt.Println(a, b, s)
}

// func main() {
// 	fmt.Println("hello world")
// 	variable()
// 	variableValue()
// }
