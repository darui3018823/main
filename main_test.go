package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestSiteHandler(t *testing.T) {
	root := t.TempDir()
	mustWriteFile(t, filepath.Join(root, "index.html"), "home")
	mustWriteFile(t, filepath.Join(root, "404.html"), "custom not found")
	mustWriteFile(t, filepath.Join(root, "asset.txt"), "asset")
	mustWriteFile(t, filepath.Join(root, "projects", "index.html"), "projects")
	if err := os.Mkdir(filepath.Join(root, "empty"), 0o755); err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		name       string
		path       string
		wantStatus int
		wantBody   string
	}{
		{name: "root index", path: "/", wantStatus: http.StatusOK, wantBody: "home"},
		{name: "static file", path: "/asset.txt", wantStatus: http.StatusOK, wantBody: "asset"},
		{name: "directory index", path: "/projects/", wantStatus: http.StatusOK, wantBody: "projects"},
		{name: "missing path", path: "/missing", wantStatus: http.StatusNotFound, wantBody: "custom not found"},
		{name: "directory without index", path: "/empty/", wantStatus: http.StatusNotFound, wantBody: "custom not found"},
	}

	handler := newSiteHandler(root)
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodGet, tt.path, nil)
			response := httptest.NewRecorder()

			handler.ServeHTTP(response, request)

			if response.Code != tt.wantStatus {
				t.Fatalf("status = %d, want %d", response.Code, tt.wantStatus)
			}
			if body := strings.TrimSpace(response.Body.String()); body != tt.wantBody {
				t.Fatalf("body = %q, want %q", body, tt.wantBody)
			}
		})
	}
}

func TestSiteHandlerHeadNotFound(t *testing.T) {
	root := t.TempDir()
	mustWriteFile(t, filepath.Join(root, "404.html"), "custom not found")
	handler := newSiteHandler(root)
	request := httptest.NewRequest(http.MethodHead, "/missing", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	if response.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusNotFound)
	}
	if response.Body.Len() != 0 {
		t.Fatalf("body length = %d, want 0", response.Body.Len())
	}
}

func mustWriteFile(t *testing.T, filename, content string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(filename), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filename, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
}
