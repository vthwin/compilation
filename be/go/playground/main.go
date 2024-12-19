package main

import "fmt"

func main() {
	fmt.Println(hello("world"))
}

func hello(name string) string {
	return fmt.Sprintf("Hello, %s!", name)
}