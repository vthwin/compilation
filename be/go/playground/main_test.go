package main

import "testing"

func TestHello(t *testing.T) {
	got := hello("world")
	want := "Hello, world!"

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}

