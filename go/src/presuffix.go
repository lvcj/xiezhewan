package main

import (
	"fmt"
	"strings"
)

func main() {
	var str string = "This is an example of a string"
	fmt.Printf("T/F? Does the string \"%s\" have prefix %s? ", str, "Th")
	fmt.Printf("%t\n", strings.HasPrefix(str, "Th"))

	fmt.Printf("%t\n", strings.Contains("abcde", "ab"))
	fmt.Printf("%d\n", strings.Index("abcde", "ab"))

	astr := "Hi, I'm Marc, Hi."
	fmt.Printf("%d\n", strings.Index(astr, "Hi"))
	fmt.Printf("%d\n", strings.LastIndex(astr, "Hi"))
	fmt.Printf("%s\n", strings.Replace(str, "is", "was", -1))

	origS := "Hi there!"
	var newS string = strings.Repeat(origS, 3)
	fmt.Println(newS, origS)
	fmt.Println(strings.ToUpper(origS))

		pstr := "The quick brown fox jumps over the lazy dog"
    sl := strings.Fields(pstr)
    fmt.Printf("Splitted in slice: %v\n", sl)
    for _, val := range sl {
        fmt.Printf("%s - ", val)
    }
    fmt.Println()
    str2 := "GO1|The ABC of Go|25"
    sl2 := strings.Split(str2, "|")
    fmt.Printf("Splitted in slice: %v\n", sl2)
    for _, val := range sl2 {
        fmt.Printf("%s - ", val)
    }
    fmt.Println()
    str3 := strings.Join(sl2,";")
    fmt.Printf("sl2 joined by ;: %s\n", str3)
}
