package main

import (
	"f1-radio-quiz/db"
	appHandlers "f1-radio-quiz/handlers"
	"fmt"
	"log"
	"net/http"
	"os"

	corsHandlers "github.com/gorilla/handlers"
	"github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file")
    }

    backendPort := os.Getenv("BACKEND_PORT")
    frontendBaseURL := os.Getenv("FRONTEND_BASE_URL")

    db.SetupDatabase()

    http.HandleFunc("/api/quiz", appHandlers.GetQuiz)
    http.HandleFunc("/api/preload-f1-data", appHandlers.PreloadF1DataHandler)

    corsAllowedOrigins := corsHandlers.AllowedOrigins([]string{frontendBaseURL})
    corsAllowedMethods := corsHandlers.AllowedMethods([]string{"GET", "POST"})
    corsAllowedHeaders := corsHandlers.AllowedHeaders([]string{"Content-Type"})

    fmt.Printf("Server is running on port %s\n", backendPort)
    log.Fatal(http.ListenAndServe(":"+backendPort, corsHandlers.CORS(corsAllowedOrigins, corsAllowedMethods, corsAllowedHeaders)(http.DefaultServeMux)))
}
