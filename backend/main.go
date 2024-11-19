package main

import (
	"f1-radio-quiz/db"
	"f1-radio-quiz/handlers"
	"fmt"
	"log"
	"net/http"
)

func main() {
    db.SetupDatabase()

    http.HandleFunc("/api/quiz", handlers.GetQuiz)
    http.HandleFunc("/api/preload-f1-data", handlers.PreloadF1DataHandler)

    fmt.Println("Server is running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
