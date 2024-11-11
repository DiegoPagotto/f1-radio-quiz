package main

import (
	"f1-radio-quiz/handlers"
	"net/http"
)

func main() {
    http.HandleFunc("/api/quiz", handlers.GetQuiz)
    http.HandleFunc("/api/check-answer", handlers.CheckAnswer)
    http.ListenAndServe(":8080", nil)
}