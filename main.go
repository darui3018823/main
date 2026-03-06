package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Get the absolute path of the current directory
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting working directory:", err)
		return
	}

	// Create a file server to serve static files
	fs := http.FileServer(http.Dir(wd))

	// Register the file server handler
	http.Handle("/", fs)

	// Start the server
	addr := "127.0.0.1:8080"
	fmt.Printf("Server running at http://%s\n", addr)
	fmt.Printf("Serving files from: %s\n", wd)

	if err := http.ListenAndServe(addr, nil); err != nil {
		fmt.Println("Server error:", err)
	}
}
