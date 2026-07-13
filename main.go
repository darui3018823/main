package main

import (
	"fmt"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func newSiteHandler(root string) http.Handler {
	fileServer := http.FileServer(http.Dir(root))

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		relativePath := strings.TrimPrefix(path.Clean("/"+r.URL.Path), "/")
		requestedPath := filepath.Join(root, filepath.FromSlash(relativePath))

		info, err := os.Stat(requestedPath)
		if err == nil {
			if !info.IsDir() {
				fileServer.ServeHTTP(w, r)
				return
			}

			if _, indexErr := os.Stat(filepath.Join(requestedPath, "index.html")); indexErr == nil {
				fileServer.ServeHTTP(w, r)
				return
			} else if !os.IsNotExist(indexErr) {
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
		} else if !os.IsNotExist(err) {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		notFoundPage, readErr := os.ReadFile(filepath.Join(root, "404.html"))
		if readErr != nil {
			http.NotFound(w, r)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusNotFound)
		if r.Method != http.MethodHead {
			_, _ = w.Write(notFoundPage)
		}
	})
}

func main() {
	// Get the absolute path of the current directory
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting working directory:", err)
		return
	}

	// Start the server
	addr := "0.0.0.0:8080"
	fmt.Printf("Server running at http://%s\n", addr)
	fmt.Printf("Serving files from: %s\n", wd)

	if err := http.ListenAndServe(addr, newSiteHandler(wd)); err != nil {
		fmt.Println("Server error:", err)
	}
}
