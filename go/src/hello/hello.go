package main

import "fmt"

func variable() {
	var a int
	var s string

	fmt.Printf("%d %q\n", a, s)
}
func variableValue() {
	var a, b int = 3, 4
	var s string = "abc"

	fmt.Println(a, b, s)
}

func main()  {
	fmt.Println("hello world")
	variable()
	variableValue()
}
